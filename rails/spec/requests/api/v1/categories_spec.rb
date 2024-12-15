require 'rails_helper'

RSpec.describe "カテゴリー", type: :request do
  describe "GET /api/v1/categories" do
    let!(:parent_category) { create(:category, name: "Parent Category") }
    let!(:child_category) { create(:category, name: "Child Category", parent: parent_category) }

    it "カテゴリ一覧を取得できる" do
      get "/api/v1/categories"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      # レスポンスの構造を確認
      expect(json).to be_an(Array)
      expect(json.size).to eq(1)

      # 親カテゴリの確認
      parent = json.first
      expect(parent["id"]).to eq(parent_category.id)
      expect(parent["name"]).to eq("Parent Category")

      # 子カテゴリの確認
      children = parent["children"]
      expect(children).to be_an(Array)
      expect(children.size).to eq(1)

      child = children.first
      expect(child["id"]).to eq(child_category.id)
      expect(child["name"]).to eq("Child Category")
    end
  end
end
