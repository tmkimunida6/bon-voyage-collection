require 'rails_helper'

RSpec.describe 'パスワードリセット', type: :request do
  let(:user) { create(:user) }
  let(:headers) { user.create_new_auth_token }
  let(:params) { {} }

  describe 'POST /api/v1/auth/password' do
    subject(:post_request) { post('/api/v1/auth/password', params:) }

    context '成功' do
      let(:params) do
        {
          email: user.email,
          redirect_url: "#{Settings.front_domain}/reset_password/new"
        }
      end

      it '正しい情報が入力された場合、パスワードリセット用のメールが送信される' do
        post_request
        expect(response).to have_http_status(:ok)
        expect(json['success']).to be true

        # メールが送信されていることを確認
        mail = ActionMailer::Base.deliveries.last
        expect(mail.to).to include(params[:email])
        expect(mail.subject).to eq('【Bon Boyage Collection】パスワードリセット手続きのご案内')
      end
    end

    context '失敗' do
      context '入力されたメールアドレスが登録しているメールアドレスと異なる場合' do
        let(:params) do
          {
            email: 'other@example.com',
            redirect_url: "#{Settings.front_domain}/reset_password/new"
          }
        end

        it '404エラーを返す' do
          post_request
          expect(response).to have_http_status(:not_found)
          expect(json['errors']).to eq(["ユーザーが見つかりませんでした。ご登録メールアドレスを入力してください。"])
        end
      end

      context 'redirect_urlがない場合' do
        let(:params) do
          {
            email: user.email,
          }
        end

        it '401エラーを返す' do
          post_request
          expect(response).to have_http_status(:unauthorized)
          expect(json['errors']).to eq(["リダイレクトURLが与えられていません。"])
        end
      end

      context 'メールアドレスの入力がない場合' do
        let(:params) do
          {
            email: "",
            redirect_url: "#{Settings.front_domain}/reset_password/new"
          }
        end

        it '404エラーを返す' do
          post_request
          expect(response).to have_http_status(:not_found)
          expect(json['errors']).to eq(["ユーザーが見つかりませんでした。ご登録メールアドレスを入力してください。"])
        end
      end
    end
  end

  describe 'PATCH /api/v1/auth/password' do
    subject(:patch_request) { patch('/api/v1/auth/password', params:) }
    let(:reset_password_token) { user.send(:set_reset_password_token) }

    context '成功' do
      let(:params) do
        {
          password: "newpassword",
          password_confirmation: "newpassword",
          reset_password_token: reset_password_token
        }
      end

      it '正しい情報が入力された場合、パスワードリセット用のメールが送信される' do
        patch_request
        expect(response).to have_http_status(:ok)
        expect(json['success']).to be true
        user.reload
        expect(user.valid_password?(params[:password])).to be true
      end
    end

    context '失敗' do
      context 'reset_password_tokenがない場合' do
        let(:params) do
          {
            password: "newpassword",
            password_confirmation: "newpassword",
          }
        end

        it '401エラーを返す' do
          patch_request
          expect(response).to have_http_status(:unauthorized)
          expect(json['errors']).not_to be_empty
        end
      end

      context 'パスワードとパスワード（確認）が一致しない場合' do
        let(:params) do
          {
            password: "newpassword",
            password_confirmation: "otherpassword",
            reset_password_token: reset_password_token
          }
        end

        it '422エラーを返す' do
          patch_request
          expect(response).to have_http_status(:unprocessable_entity)
          expect(json['errors']["full_messages"]).to eq(["パスワード（確認用）とパスワードの入力が一致しません"])
        end
      end

    end
  end
end
