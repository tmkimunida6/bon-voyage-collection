require 'rails_helper'

RSpec.describe 'プロフィール変更', type: :request do
  let(:user) { create(:user, nickname: "ニックネーム", image: "http://example.com/image.jpg") }
  let(:headers) { user.create_new_auth_token }
  let(:params) { {} }

  describe 'PATCH /api/v1/auth' do
    subject(:patch_request) { patch('/api/v1/auth', params:, headers:) }

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
end
