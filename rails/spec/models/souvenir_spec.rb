require 'rails_helper'

RSpec.describe Souvenir, type: :model do
  describe "新規作成" do
    let(:user) { create(:user) }
    let(:category) { create(:category) }
    let(:souvenir) { build(:souvenir, user: user, category: category) }

    context "成功" do
      it "正しく情報が入力された場合、バリデーションに成功する" do
        expect(souvenir).to be_valid
        expect(souvenir.errors).to be_empty
      end

      it "データベース保存時に、alias_idが自動生成される" do
        created_souvenir = create(:souvenir, user: user, category: category)
        expect(created_souvenir.alias_id).to be_present
        expect(created_souvenir.alias_id).to be_a(String)
      end
    end

    context "失敗" do
      it "名前が空の場合、バリデーションに失敗する" do
        souvenir.name = nil
        expect(souvenir).to be_invalid
        expect(souvenir.errors[:name]).not_to be_empty
      end

      it "画像URLが空の場合、バリデーションに失敗する" do
        souvenir.image_url = nil
        expect(souvenir).to be_invalid
        expect(souvenir.errors[:image_url]).not_to be_empty
      end

      it "名前が重複している場合、バリデーションに失敗する" do
        create(:souvenir, user: user, category: category, name: "重複したお土産名")
        duplicate_souvenir = build(:souvenir, name: "重複したお土産名")
        expect(duplicate_souvenir).to be_invalid
        expect(duplicate_souvenir.errors[:name]).not_to be_empty
      end

      it "画像URLが重複している場合、バリデーションに失敗する" do
        create(:souvenir, user: user, category: category, image_url: "https://example.com/image.jpg")
        duplicate_souvenir = build(:souvenir, image_url: "https://example.com/image.jpg")
        expect(duplicate_souvenir).to be_invalid
        expect(duplicate_souvenir.errors[:image_url]).not_to be_empty
      end

      it "ユーザーが関連付けられていない場合、バリデーションに失敗する" do
        souvenir.user = nil
        expect(souvenir).to be_invalid
        expect(souvenir.errors[:user]).not_to be_empty
      end

      it "カテゴリが関連付けられていない場合、バリデーションに失敗する" do
        souvenir.category = nil
        expect(souvenir).to be_invalid
        expect(souvenir.errors[:category]).not_to be_empty
      end
    end
  end
end
