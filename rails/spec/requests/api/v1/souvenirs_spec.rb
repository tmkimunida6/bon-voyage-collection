require 'rails_helper'

RSpec.describe "お土産", type: :request do
  let(:user) { create(:user) }
  let(:headers) { user.create_new_auth_token }
  let(:params) { {} }
  let(:category) { create(:category) }
  let(:souvenir) { create(:souvenir, user:, category:) }

  # describe "GET /api/v1/souvenirs" do
  #   subject(:get_request) { get '/api/v1/souvenirs', params: search_params }

  #   context '検索' do
  #     let!(:souvenir1) { create(:souvenir, name: 'Tokyo Tower', description: 'A famous landmark in Tokyo', user:, category:) }
  #     let!(:souvenir2) { create(:souvenir, name: 'Kyoto Temple', description: 'A beautiful temple in Kyoto', user:, category:) }
  #     let!(:souvenir3) { create(:souvenir, name: 'Osaka Castle', description: 'A historic castle in Osaka', user:, category:) }

  #     context '検索条件が一致する場合' do
  #       let(:search_params) { { name_or_description_cont: 'Tokyo' } }

  #       it '一致するお土産を返す' do
  #         get_request
  #         expect(response).to have_http_status(:ok)
  #         expect(json['souvenirs'].size).to eq(1)
  #         expect(json['souvenirs'].first['name']).to eq('Tokyo Tower')
  #       end
  #     end

  #     context '検索条件が一致しない場合' do
  #       let(:search_params) { { name_or_description_cont: 'Hokkaido' } }

  #       it '空の結果を返す' do
  #         get_request
  #         expect(response).to have_http_status(:ok)
  #         expect(json['souvenirs']).to be_empty
  #       end
  #     end

  #     context '複数の検索条件を指定した場合' do
  #       let(:search_params) { { name_or_description_cont: 'Temple', category_id_eq: category.id } }

  #       it '一致するお土産を返す' do
  #         get_request
  #         expect(response).to have_http_status(:ok)
  #         expect(json['souvenirs'].size).to eq(1)
  #         expect(json['souvenirs'].first['name']).to eq('Kyoto Temple')
  #       end
  #     end

  #     context '検索条件が指定されていない場合' do
  #       let(:search_params) { {} }

  #       it '全てのお土産を返す' do
  #         get_request
  #         expect(response).to have_http_status(:ok)
  #         expect(json['souvenirs'].size).to eq(3)
  #       end
  #     end
  #   end

  #   context 'ページネーションが指定された場合' do
  #     let!(:souvenirs) { create_list(:souvenir, 11, user:, category:) }
  #     let(:search_params) { { page: 2 } }

  #     it '指定されたページのデータを返す' do
  #       get_request
  #       expect(response).to have_http_status(:ok)
  #       expect(json['souvenirs'].size).to eq(1)
  #       expect(json['pages']['current_page']).to eq(2)
  #       expect(json['pages']['total_pages']).to eq(2)
  #     end
  #   end
  # end

  # describe 'GET /api/v1/souvenirs/:id' do
  #   context '存在するお土産の場合' do
  #     it 'お土産の詳細を取得できる' do
  #       get "/api/v1/souvenirs/#{souvenir.alias_id}"
  #       expect(response).to have_http_status(:ok)
  #       expect(json['alias_id']).to eq(souvenir.alias_id.to_s)
  #     end
  #   end

  #   context '存在しないお土産の場合' do
  #     it '404エラーを返す' do
  #       get '/api/v1/souvenirs/invalid_id'
  #       expect(response).to have_http_status(:not_found)
  #     end
  #   end
  # end

  # describe 'GET /api/v1/souvenirs/:id/related' do
  #   let!(:related_souvenirs) { create_list(:souvenir, 2, user:, category:) }

  #   it '関連するお土産を取得できる' do
  #     get "/api/v1/souvenirs/#{souvenir.alias_id}/related"
  #     expect(response).to have_http_status(:ok)
  #     expect(json.size).to eq(2)
  #   end
  # end

  # describe 'POST /api/v1/souvenirs' do
  #   subject(:post_request) { post('/api/v1/souvenirs', headers:, params:) }
  #   let(:params) do
  #     {
  #       name: 'Test Souvenir',
  #       description: 'This is a test souvenir.',
  #       category_id: category.id,
  #       image_url: 'http://example.com/image.jpg'
  #     }
  #   end

  #   context '認証済みのユーザーの場合' do
  #     context '正しい情報を入力した場合' do
  #       it 'お土産を登録できる' do
  #         expect { post_request }.to change { Souvenir.count }.by(1)
  #         expect(response).to have_http_status(:ok)
  #         expect(json['name']).to eq('Test Souvenir')
  #       end
  #     end

  #     context 'お土産の名称の入力がない場合' do
  #       let(:params) { super().merge(name: '') }
  #       it 'エラーを返す' do
  #         post_request
  #         expect(response).to have_http_status(:unprocessable_entity)
  #         json = JSON.parse(response.body)
  #         expect(json['errors']).to eq ["お土産の名称を入力してください"]
  #       end
  #     end

  #     context 'カテゴリーの選択がない場合' do
  #       let(:params) { super().merge(category_id: '') }
  #       it 'エラーを返す' do
  #         post_request
  #         expect(response).to have_http_status(:not_found)
  #         json = JSON.parse(response.body)
  #         expect(json['errors']).to eq ["カテゴリーを選択してください。"]
  #       end
  #     end

  #     context '画像URLの入力がない場合' do
  #       let(:params) { super().merge(image_url: '') }
  #       it 'エラーを返す' do
  #         post_request
  #         expect(response).to have_http_status(:unprocessable_entity)
  #         json = JSON.parse(response.body)
  #         expect(json['errors']).to eq ["画像を入力してください"]
  #       end
  #     end

  #     context '同じ名前のお土産を登録しようとした場合' do
  #       let(:params) { super().merge(name: souvenir.name) }
  #       it 'エラーを返す' do
  #         post_request
  #         expect(response).to have_http_status(:unprocessable_entity)
  #         json = JSON.parse(response.body)
  #         expect(json['errors']).to eq ["お土産の名称はすでに存在します"]
  #       end
  #     end
  #   end

  #   context '未認証のユーザーの場合' do
  #     let(:headers) { nil }
  #     it '401エラーを返す' do
  #       post_request
  #       expect(response).to have_http_status(:unauthorized)
  #     end
  #   end
  # end

  # describe 'GET /api/v1/souvenirs/favorited_index' do
  #   let!(:favorited_souvenirs) { create_list(:souvenir, 2, user:, category:) }
  #   let!(:favorites) { favorited_souvenirs.map { |souvenir| create(:favorite, user:, souvenir:) } }
  #   subject(:get_request) { get('/api/v1/souvenirs/favorited_index', headers:) }

  #   context '認証済みユーザーの場合' do
  #     it 'お気に入りのお土産一覧を取得できる' do
  #       get_request
  #       expect(response).to have_http_status(:ok)
  #       expect(json.size).to eq(2)
  #       expect(json.map { |souvenir| souvenir['alias_id'] }).to match_array(favorited_souvenirs.map(&:alias_id))
  #     end
  #   end

  #   context '未認証のユーザーの場合' do
  #     let(:headers) { nil }
  #     it '401エラーを返す' do
  #       get_request
  #       expect(response).to have_http_status(:unauthorized)
  #     end
  #   end
  # end

  describe "GET /api/v1/souvenirs/recommend" do
    subject(:get_request) { get '/api/v1/souvenirs/recommend', params: search_params, headers: auth_headers }

    let(:user) { create(:user) }
    let(:auth_headers) { user.create_new_auth_token }

    let!(:category) { create(:category) }
    let!(:souvenir1) { create(:souvenir, name: 'Tokyo Tower', description: 'A famous landmark in Tokyo', user:, category:) }
    let!(:souvenir2) { create(:souvenir, name: 'Kyoto Temple', description: 'A beautiful temple in Kyoto', user:, category:) }
    let!(:souvenir3) { create(:souvenir, name: 'Osaka Castle', description: 'A historic castle in Osaka', user:, category:) }

    context 'ログインユーザーの場合' do
      before do
        # ユーザーがすでにお気に入りに登録したお土産
        create(:favorite, user:, souvenir: souvenir1)
        # ユーザーが投稿したお土産
        create(:post, user:, souvenir: souvenir2)
      end

      context '検索条件が指定されている場合' do
        let(:search_params) { { name_or_description_cont: 'Castle', category_id_eq: category.id } }

        it '条件に一致し、除外されたお土産を返さない' do
          get_request
          expect(response).to have_http_status(:ok)
          expect(json.size).to eq(1)
          expect(json.first['name']).to eq('Osaka Castle')
        end
      end

      context '検索条件が指定されていない場合' do
        let(:search_params) { {} }

        it 'ランダムにお土産を返す（お気に入りと投稿済みは除外）' do
          get_request
          expect(response).to have_http_status(:ok)
          expect(json.size).to eq(1)
          expect(json.first['name']).to eq('Osaka Castle')
        end
      end
    end

    context '未ログインユーザーの場合' do
      let(:auth_headers) { {} }

      context '検索条件が指定されている場合' do
        let(:search_params) { { name_or_description_cont: 'Temple', category_id_eq: category.id } }

        it '条件に一致するお土産を返す' do
          get_request
          expect(response).to have_http_status(:ok)
          expect(json.size).to eq(1)
          expect(json.first['name']).to eq('Kyoto Temple')
        end
      end

      context '検索条件が指定されていない場合' do
        let(:search_params) { {} }

        it 'ランダムにお土産を返す' do
          get_request
          expect(response).to have_http_status(:ok)
          expect(json.size).to eq(3)
        end
      end
    end
  end
end
