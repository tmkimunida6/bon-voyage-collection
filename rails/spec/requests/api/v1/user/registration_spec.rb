require 'rails_helper'

RSpec.describe 'ユーザー登録', type: :request do
  describe 'POST /api/v1/auth/register' do
    subject(:post_request) { post('/api/v1/auth', params:) }
    let(:params) { {} }

    context 'ユーザー登録成功' do
      let(:params) do
        {
          email: 'test@example.com',
          password: 'password',
          password_confirmation: 'password',
          confirm_success_url: "#{Settings.front_domain}/sign_in"
        }
      end

      it '正しく情報が入力された場合、確認メールが送信される' do
        expect { post_request }.to change { User.count }.by(1)
        expect(response).to have_http_status(:ok)
        expect(json['status']).to eq('success')

        # メールが送信されていることを確認
        mail = ActionMailer::Base.deliveries.last
        expect(mail.to).to include(params[:email])
        expect(mail.subject).to eq('【Bon Voyage Collection】メールアドレス認証のご案内')
      end
    end

    context 'ユーザー登録失敗' do
      let(:params) do
        {
          email: 'test@example.com',
          password: 'password',
          password_confirmation: 'wrongpassword',
          confirm_success_url: "#{Settings.front_domain}/sign_in"
        }
      end

      it 'パスワードが一致していない場合、エラーを返す' do
        expect { post_request }.to change { User.count }.by(0)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json['errors']).not_to be_empty
      end
    end
  end

  describe 'メール認証' do
    let(:user) { create(:user, confirmed_at: nil) }
    before do
      user.send_confirmation_instructions
      user.reload
    end
    let(:token) { user.confirmation_token }
    subject(:patch_request) { patch('/api/v1/user/confirmations', params: { confirmation_token: token }) }

    context '成功' do
      it 'メール認証が成功し、ユーザーが確認済みになる' do
        patch_request
        expect(response).to have_http_status(:ok)
        expect(json['message']).to eq('メールアドレスの認証に成功しました')

        user.reload
        expect(user.confirmed?).to be true
      end
    end

    context '失敗' do
      context '無効なトークンの場合' do
        let(:token) { 'invalid_token' }

        it '404エラーを返す' do
          patch_request
          expect(response).to have_http_status(:not_found)
          expect(json['message']).to eq('ユーザーが見つかりませんでした。再度会員登録を行ってください。')
        end
      end

      context 'すでに認証済みのユーザーの場合、' do
        it '400エラーを返す' do
          # 1回目は認証成功
          patch_request
          expect(response).to have_http_status(:ok)

          user.reload
          expect(user.confirmed?).to be true

          # 2回目は認証失敗
          patch "/api/v1/user/confirmations", params: { confirmation_token: token }
          expect(response).to have_http_status(:bad_request)
          expect(json['message']).to eq('このメールアドレスはすでに認証済みです。')
        end
      end

      context 'confirmation_tokenが空の場合' do
        let(:token) { nil }

        it '404エラーを返す' do
          patch_request
          expect(response).to have_http_status(:not_found)
          expect(json['message']).to eq('ユーザーが見つかりませんでした。再度会員登録を行ってください。')
        end
      end
    end
  end
end
