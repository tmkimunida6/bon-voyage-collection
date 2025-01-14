require 'rails_helper'

RSpec.describe 'ユーザー認証', type: :request do
  describe 'POST /api/v1/auth/sign_in' do
    let(:user) { create(:user) }
    subject(:post_request) { post('/api/v1/auth/sign_in', params:) }
    let(:params) { {} }

    context 'ログイン成功' do
      let(:params) { { email: user.email, password: user.password } }

      it '成功のレスポンスを返し、トークンを返す' do
        post_request
        expect(response).to have_http_status(:ok)
        expect(response.headers['access-token']).to be_present
        expect(response.headers['client']).to be_present
        expect(response.headers['uid']).to eq(user.email)
      end
    end

    context 'ログイン失敗' do
      context '間違ったパスワードを入力した場合' do
        let(:params) { { email: user.email, password: 'wrongpassword' } }

        it '権限エラーを返す' do
          post_request
          expect(response).to have_http_status(:unauthorized)
          expect(json['errors']).to eq [ 'メールアドレスまたはパスワードの組み合わせが正しくありません。再度お試しください。' ]
        end
      end

      context '間違ったメールアドレスを入力した場合' do
        let(:params) { { email: 'incorrect@example.com', password: user.password } }

        it '権限エラーを返す' do
          post_request
          expect(response).to have_http_status(:unauthorized)
          expect(json['errors']).to eq [ 'メールアドレスまたはパスワードの組み合わせが正しくありません。再度お試しください。' ]
        end
      end
    end
  end

  describe 'DELETE /api/v1/auth/sign_out' do
    let(:user) { create(:user) }
    let(:headers) { user.create_new_auth_token }
    subject(:delete_request) { delete('/api/v1/auth/sign_out', headers:) }

    context 'ログアウト成功' do

      it '成功のレスポンスを返す' do
        delete_request
        expect(response).to have_http_status(:ok)
        expect(json['success']).to be true
      end
    end

    context 'ログアウト失敗' do
      context 'トークンがない場合' do
        let(:headers) {}

        it '権限エラーを返す' do
          delete_request
          expect(response).to have_http_status(:not_found)
          expect(json['errors']).to eq [ 'ユーザーが見つからないか、ログインしていません。' ]
        end
      end
    end
  end
end
