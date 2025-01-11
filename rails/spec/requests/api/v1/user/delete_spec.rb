require 'rails_helper'

RSpec.describe 'ユーザー削除', type: :request do
  let!(:user) { create(:user) }
  let(:headers) { user.create_new_auth_token }

  describe 'DELETE /api/v1/auth' do
    subject(:delete_request) { delete('/api/v1/auth', headers:) }

    context '認証情報がある場合' do
      it '成功' do
        expect { delete_request }.to change { User.count }.by(-1)
        expect(response).to have_http_status(:ok)
        expect(json['message']).to eq("'#{user.uid}' のアカウントは削除されました。")
      end
    end

    context '認証情報がない場合' do
      let(:headers) { {} }

      it '失敗' do
        expect { delete_request }.not_to change { User.count }
        expect(response).to have_http_status(:not_found)
        expect(json['errors']).to eq(["削除するアカウントが見つかりません。"])
      end
    end
  end
end
