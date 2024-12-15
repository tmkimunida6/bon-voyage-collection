require 'rails_helper'

RSpec.describe "投稿", type: :request do
  let(:user) { create(:user) }
  let(:headers) { user.create_new_auth_token }
  let(:params) { {} }
  let(:category) { create(:category) }
  let(:souvenir) { create(:souvenir, user:, category:) }

  describe "GET /api/v1/posts" do
    subject(:get_request) { get '/api/v1/posts', params: search_params }

    context 'ページネーションが指定された場合' do
      let!(:souvenirs) { create_list(:souvenir, 11, user:, category:) }
      let!(:posts) { souvenirs.map { |souvenir| create(:post, user:, souvenir:) } }
      let(:search_params) { { page: 2 } }

      it '指定されたページのデータを返す' do
        get_request
        expect(response).to have_http_status(:ok)
        expect(json['posts'].size).to eq(1)
        expect(json['pages']['current_page']).to eq(2)
        expect(json['pages']['total_pages']).to eq(2)
      end
    end
  end

  describe 'POST /api/v1/posts' do
    subject(:post_request) { post('/api/v1/posts', headers:, params:) }
    let(:params) do
      {
        souvenir_id: souvenir.alias_id,
        rating: 4.5,
        for_who: 'for_myself',
        age: 'under_ten',
        review: 'This is a test post.',
        image_url: 'http://example.com/image.jpg'
      }
    end

    context '認証済みのユーザーの場合' do
      context '正しい情報を入力した場合' do
        it '投稿できる' do
          expect { post_request }.to change { Post.count }.by(1)
          expect(response).to have_http_status(:ok)
          expect(json['souvenir']['alias_id']).to eq(souvenir.alias_id)
        end
      end

      context 'お土産が選択されていない場合' do
        let(:params) { super().merge(souvenir_id: '') }
        it 'エラーを返す' do
          post_request
          expect(response).to have_http_status(:unprocessable_entity)
          expect(json['errors']).to eq ["お土産を選択してください。"]
        end
      end

      context '同じお土産に対して投稿しようとした場合' do
        let(:first_post) { create(:post, user:, souvenir:) }
        let(:params) { super().merge(souvenir_id: first_post.souvenir.alias_id) }
        it 'エラーを返す' do
          post_request
          expect(response).to have_http_status(:unprocessable_entity)
          expect(json['errors']).to eq ["このお土産はすでに記録済みです。"]
        end
      end
    end

    context '未認証のユーザーの場合' do
      let(:headers) { nil }
      it '401エラーを返す' do
        expect { post_request }.not_to change { Post.count }
        expect(response).to have_http_status(:unauthorized)
        expect(json['errors']).to eq ["ログインもしくはアカウント登録してください。"]
      end
    end
  end

  describe 'DELETE /api/v1/posts/:id' do
    let!(:exist_post) { create(:post, user:, souvenir:) }
    subject(:delete_request) { delete "/api/v1/posts/#{exist_post.alias_id}", headers: headers }

    context '認証済みのユーザーの場合' do
      it '投稿を削除できる' do
        expect { delete_request }.to change { Post.count }.by(-1)
        expect(response).to have_http_status(:ok)
      end
    end

    context '未認証のユーザーの場合' do
      let(:headers) { nil }

      it '401エラーを返す' do
        expect { delete_request }.not_to change { Post.count }
        expect(response).to have_http_status(:unauthorized)
        expect(json['errors']).to eq ["ログインもしくはアカウント登録してください。"]
      end
    end

    context '異なるユーザーの投稿を削除しようとした場合' do
      let(:other_user) { create(:user) }
      let(:headers) { other_user.create_new_auth_token }

      it '403エラーを返す' do
        expect { delete_request }.not_to change { Post.count }
        expect(response).to have_http_status(:forbidden)
        expect(json['error']).to eq "ログインしているユーザーを確認してください。"
      end
    end
  end

  describe "GET /api/v1/posts/by_souvenir" do
    let!(:user_post) { create(:post, user:, souvenir:) }
    let!(:other_user) { create(:user) }
    let!(:other_user_post) { create(:post, user: other_user, souvenir:) }

    subject(:get_request) do
      get "/api/v1/posts/by_souvenir/#{souvenir.alias_id}?page=1&&user_id=#{user.alias_id}", headers: headers
    end

    context "お土産が存在する場合" do
      it "指定されたお土産に関連する投稿を取得できる" do
        get_request
        expect(response).to have_http_status(:ok)
        expect(json['posts'].size).to eq(2)
        expect(json['posts'].first['alias_id']).to eq(user_post.alias_id)
        expect(json['pages']['current_page']).to eq(1)
        expect(json['pages']['total_pages']).to eq(1)
      end
    end

    context "お土産が存在しない場合" do
      it "404エラーを返す" do
        get "/api/v1/posts/index_by_souvenir", params: { id: "nonexistent", user_id: user.alias_id, page: 1 }, headers: headers
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
