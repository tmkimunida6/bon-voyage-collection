require 'rails_helper'

RSpec.describe 'プロフィール変更', type: :request do
  let(:user) { create(:user) }
  let(:headers) { user.create_new_auth_token }
  let(:params) { {} }

  describe 'PATCH /api/v1/auth' do
    subject(:patch_request) { patch('/api/v1/auth', params:, headers:) }

    context "表示名・プロフィール画像の変更" do
      context '成功' do
        let(:params) do
          {
            nickname: '新しいニックネーム',
            image: 'http://example.com/new-image.jpg'
          }
        end

        it '正しい情報が送信された場合、プロフィールが更新される' do
          patch_request
          expect(response).to have_http_status(:ok)
          expect(json['data']['nickname']).to eq(params[:nickname])
          expect(json['data']['image']).to eq(params[:image])

          user.reload
          expect(user.nickname).to eq(params[:nickname])
          expect(user.image).to eq(params[:image])
        end
      end

      context '失敗' do
        context '認証情報がない場合' do
          let(:headers) { {} }

          it '422エラーを返す' do
            patch_request
            expect(response).to have_http_status(:unprocessable_entity)
            expect(json['errors']).not_to be_empty
          end
        end

        context '画像URLの形式が正しくない場合' do
          let(:params) { { nickname: user.nickname, image: 'invalid_url' } }

          it '422エラーを返す' do
            patch_request
            expect(response).to have_http_status(:unprocessable_entity)
            expect(json['errors']).not_to be_empty
          end
        end
      end

      context 'nicknameが空文字の場合' do
        let(:params) { { nickname: '', image: user.image } }

        it '表示名は変更されない' do
          prev_nickname = user.nickname
          patch_request
          expect(response).to have_http_status(:ok)
          expect(json['data']['nickname']).to eq(prev_nickname)

          user.reload
          expect(user.nickname).to eq(prev_nickname)
        end
      end
    end

    context "メールアドレスの変更" do
      context '成功' do
        let(:params) do
          {
            email: "new-email@example.com",
            current_password: user.password
          }
        end

        it '正しく情報が入力された場合、unconfirmed_emailにメールアドレスが保存され、確認メールが送信される' do
          patch_request
          expect(response).to have_http_status(:ok)
          expect(json['status']).to eq('success')

          user.reload
          expect(user.unconfirmed_email).to eq(params[:email])

          # メールが送信されていることを確認
          mail = ActionMailer::Base.deliveries.last
          expect(mail.to).to include(params[:email])
          expect(mail.subject).to eq('【Bon Boyage Collection】メールアドレス変更手続きのご案内')
        end
      end

      context '失敗' do
        context '現在のパスワードがない場合' do
          let(:params) do
            {
              email: "new-email@example.com",
              current_password: ''
            }
          end

          it '422エラーになる' do
            patch_request
            expect(response).to have_http_status(:unprocessable_entity)
            expect(json['status']).to eq('error')
            expect(json['errors']['full_messages']).to eq(['現在のパスワードを入力してください'])
          end
        end

        context '現在のパスワードが間違っていた場合' do
          let(:params) do
            {
              email: "new-email@example.com",
              current_password: 'wrongpassword'
            }
          end

          it '422エラーになる' do
            patch_request
            expect(response).to have_http_status(:unprocessable_entity)
            expect(json['status']).to eq('error')
            expect(json['errors']['full_messages']).to eq(['現在のパスワードが正しくありません。'])

            user.reload
            expect(user.unconfirmed_email).to eq(nil)
          end
        end

        context 'メールアドレスが現在のものと同じ場合' do
          let(:params) do
            {
              email: user.email,
              current_password: user.password
            }
          end

          it '422エラーになる' do
            patch_request
            expect(response).to have_http_status(:unprocessable_entity)
            expect(json['status']).to eq('error')
            expect(json['errors']['full_messages']).to eq(['新しいメールアドレスは現在のメールアドレスと異なる必要があります。'])

            user.reload
            expect(user.unconfirmed_email).to eq(nil)
          end
        end

        context 'メールアドレスが他のユーザーと重複している場合' do
          let(:other_user) { create(:user, email: "other-email@example.com") }
          let(:params) do
            {
              email: other_user.email,
              current_password: user.password
            }
          end

          it '409エラーになる' do
            patch_request
            expect(response).to have_http_status(:conflict)
            expect(json['status']).to eq('error')
            expect(json['errors']['full_messages']).to eq(['このメールアドレスはすでに使用されています。'])

            user.reload
            expect(user.unconfirmed_email).to eq(nil)
          end
        end
      end
    end

  end

  describe 'メール認証' do
    subject(:patch_request) { patch('/api/v1/auth', params:, headers:) }

    context 'メールアドレス変更' do
      let(:params) do
        {
          email: "new-email@example.com",
          current_password: user.password
        }
      end
      let(:token) { user.confirmation_token }
      subject(:confirmation_request) { patch('/api/v1/user/confirmations', params: { confirmation_token: token }) }

      before do
        patch_request
        user.reload
      end

      context '成功' do
        it 'メールアドレスが認証される' do
          confirmation_request
          expect(response).to have_http_status(:ok)

          user.reload
          expect(user.email).to eq(params[:email])
        end
      end

      context '失敗' do
        context '無効なトークンの場合' do
          let(:token) { 'invalid_token' }

          it '404エラーを返す' do
            confirmation_request
            expect(response).to have_http_status(:not_found)
            expect(json['message']).to eq('ユーザーが見つかりませんでした。再度会員登録を行ってください。')
          end
        end

        context 'confirmation_tokenが空の場合' do
          let(:token) { nil }

          it '404エラーを返す' do
            confirmation_request
            expect(response).to have_http_status(:not_found)
            expect(json['message']).to eq('ユーザーが見つかりませんでした。再度会員登録を行ってください。')
          end
        end
      end
    end

  end
end
