require 'rails_helper'

RSpec.describe 'ユーザー削除', type: :request do
  let!(:user) { create(:user) }
  let!(:category) { create(:category) }
  let!(:souvenirs) { create_list(:souvenir, 3, user:, category:) }
  let!(:posts) { souvenirs.map { |souvenir| create(:post, user:, souvenir:) } }
  let!(:favorite) { souvenirs.map { |souvenir| create(:favorite, user:, souvenir:) } }
  let(:headers) { user.create_new_auth_token }

  describe 'DELETE /api/v1/auth' do
    subject(:delete_request) { delete('/api/v1/auth', headers:) }

    context '認証情報がある場合' do
      it 'ユーザーと関連するデータが削除される' do
        # 削除前のデータ数を確認
        expect(User.count).to eq(1)
        expect(Souvenir.count).to eq(3)
        expect(Post.count).to eq(3)
        expect(Favorite.count).to eq(3)

        # ユーザー削除リクエストを送信
        expect { delete_request }.to change { User.count }.by(-1)
          .and change { Souvenir.count }.by(-3)
          .and change { Post.count }.by(-3)
          .and change { Favorite.count }.by(-3)

        # レスポンスの確認
        expect(response).to have_http_status(:ok)
        expect(json['message']).to eq("'#{user.uid}' のアカウントは削除されました。")
      end
    end

    context '認証情報がない場合' do
      let(:headers) { {} }

      it '失敗し、データは削除されない' do
        # 削除前のデータ数を確認
        expect(User.count).to eq(1)
        expect(Souvenir.count).to eq(3)
        expect(Post.count).to eq(3)
        expect(Favorite.count).to eq(3)

        # ユーザー削除リクエストを送信
        expect { delete_request }.not_to change { User.count }
        expect { delete_request }.not_to change { Souvenir.count }
        expect { delete_request }.not_to change { Post.count }
        expect { delete_request }.not_to change { Favorite.count }

        # レスポンスの確認
        expect(response).to have_http_status(:not_found)
        expect(json['errors']).to eq([ "削除するアカウントが見つかりません。" ])
      end
    end
  end
end
