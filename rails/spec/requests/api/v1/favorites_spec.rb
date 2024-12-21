require 'rails_helper'

RSpec.describe "お気に入り", type: :request do
  let(:user) { create(:user) }
  let(:headers) { user.create_new_auth_token }
  let(:category) { create(:category) }
  let(:souvenir) { create(:souvenir, user:, category: category) }

  describe "POST /api/v1/souvenirs/:id/favorites" do
    subject(:post_request) { post "/api/v1/souvenirs/#{souvenir.alias_id}/favorites", headers: headers }

    context "認証済みのユーザーの場合" do
      it "お気に入りに追加できる" do
        expect { post_request }.to change { Favorite.count }.by(1)
        expect(response).to have_http_status(:created)
        expect(json['status']).to eq("success")
        expect(json['message']).to eq("「欲しい！」に追加しました。")
      end


      it "すでにお気に入りに追加済みの場合、エラーを返す" do
        create(:favorite, user: user, souvenir: souvenir)

        post_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json['status']).to eq("error")
        expect(json['message']).to eq ["このお土産はすでに「欲しい！」に追加済みです"]
      end
    end

    context "未認証のユーザーの場合" do
      let(:headers) { nil }

      it "401エラーを返す" do
        post_request
        expect(response).to have_http_status(:unauthorized)
        expect(json['errors']).to eq ["ログインもしくはアカウント登録してください。"]
      end
    end
  end

  describe "DELETE /api/v1/favorites" do
    let!(:favorite) { create(:favorite, user: user, souvenir: souvenir) }
    subject(:delete_request) { delete "/api/v1/souvenirs/#{souvenir.alias_id}/favorites", headers: headers }

    context "認証済みのユーザーの場合" do
      it "お気に入りから削除できる" do
        expect { delete_request }.to change { Favorite.count }.by(-1)
        expect(response).to have_http_status(:created)
        expect(json['status']).to eq("success")
        expect(json['message']).to eq("「欲しい！」から削除しました。")
      end
    end

    context "未認証のユーザーの場合" do
      let(:headers) { nil }

      it "401エラーを返す" do
        delete_request
        expect(response).to have_http_status(:unauthorized)
        expect(json['errors']).to eq ["ログインもしくはアカウント登録してください。"]
      end
    end

    context "お気に入りが存在しない場合" do
      before { favorite.destroy }

      it "エラーを返す" do
        delete_request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json['status']).to eq("error")
        expect(json['message']).to eq("「欲しい！」からの削除に失敗しました。")
      end
    end
  end

  describe "POST /api/v1/souvenirs/favorites/bulk_create" do
    let!(:souvenir1) { create(:souvenir, user:, category:) }
    let!(:souvenir2) { create(:souvenir, user:, category:) }
    let!(:souvenir3) { create(:souvenir, user:, category:) }
    subject(:post_request) { post "/api/v1/souvenirs/favorites/bulk_create", params: params, headers: headers }

    context "認証済みのユーザーの場合" do
      context "有効なsouvenir_idsが指定された場合" do
        let(:params) { { souvenir_ids: [souvenir1.alias_id, souvenir2.alias_id] } }

        it "指定されたお土産をお気に入りに追加する" do
          expect { post_request }.to change { Favorite.count }.by(2)
          expect(response).to have_http_status(:created)
          expect(json['status']).to eq("success")
          expect(json['message']).to eq("おすすめのお土産を「欲しい！」に追加しました。")
        end
      end

      context "souvenir_idsが空の場合" do
        let(:params) { { souvenir_ids: [] } }

        it "お気に入りの数は変わらない" do
          post_request
          expect { post_request }.to change { Favorite.count }.by(0)
        end
      end

      context "すでにお気に入りに追加済みのお土産が含まれる場合" do
        before { create(:favorite, user:, souvenir: souvenir1) }
        let(:params) { { souvenir_ids: [souvenir1.alias_id, souvenir2.alias_id] } }

        it "未追加のお土産のみを追加する" do
          expect { post_request }.to change { Favorite.count }.by(1)
          expect(response).to have_http_status(:created)
          expect(json['status']).to eq("success")
          expect(json['message']).to eq("おすすめのお土産を「欲しい！」に追加しました。")
        end
      end

      context "存在しないsouvenir_idが含まれる場合" do
        let(:params) { { souvenir_ids: [souvenir1.alias_id, "nonexistent_id"] } }

        it "存在するお土産のみを追加する" do
          expect { post_request }.to change { Favorite.count }.by(1)
          expect(response).to have_http_status(:created)
          expect(json['status']).to eq("success")
          expect(json['message']).to eq("おすすめのお土産を「欲しい！」に追加しました。")
        end
      end
    end

    context "未認証のユーザーの場合" do
      let(:headers) { nil }
      let(:params) { { souvenir_ids: [souvenir1.alias_id, souvenir2.alias_id] } }

      it "401エラーを返す" do
        post_request
        expect(response).to have_http_status(:unauthorized)
        expect(json['errors']).to eq ["ログインもしくはアカウント登録してください。"]
      end
    end
  end
end
