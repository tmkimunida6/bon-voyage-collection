require 'rails_helper'

RSpec.describe "ログイン中のユーザー情報取得", type: :request do
  describe "GET /api/v1/current/user" do
    subject(:get_request) { get("/api/v1/current/user", headers:) }
    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }

    context "ヘッダー情報が正常に送られた場合" do
      it "正常にレコードを取得できる" do
        get_request
        res = JSON.parse(response.body)
        expect(res.keys).to eq [ "alias_id", "nickname", "image" ]
        expect(response).to have_http_status(:ok)
      end
    end

    context "ヘッダー情報が空の場合" do
      let(:headers) { nil }

      it "権限エラーが返却される" do
        get_request
        expect(response).to have_http_status(:unauthorized)
        expect(json["errors"]).to eq [ "ログインもしくはアカウント登録してください。" ]
      end
    end
  end
end
