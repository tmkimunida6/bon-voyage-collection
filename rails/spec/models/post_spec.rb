require 'rails_helper'

RSpec.describe Post, type: :model do
  describe "新規作成" do
    let(:user) { create(:user) }
    let(:category) { create(:category) }
    let(:souvenir) { create(:souvenir, user: user, category: category) }
    let(:post) { build(:post, user: user, souvenir: souvenir) }

    context "成功" do
      it "正しく情報が入力された場合、バリデーションに成功する" do
        expect(post).to be_valid
        expect(post.errors).to be_empty
      end

      it "データベース保存時に、alias_idが自動生成される" do
        created_post = create(:post, user: user, souvenir: souvenir)
        expect(created_post.alias_id).to be_present
        expect(created_post.alias_id).to be_a(String)
      end
    end

    context "失敗" do
      it "ユーザーが関連付けられていない場合、バリデーションに失敗する" do
        post.user = nil
        expect(post).to be_invalid
        expect(post.errors[:user]).not_to be_empty
      end

      it "お土産が関連付けられていない場合、バリデーションに失敗する" do
        post.souvenir = nil
        expect(post).to be_invalid
        expect(post.errors[:souvenir]).not_to be_empty
      end

      it "評価スコアが範囲外の場合、バリデーションに失敗する" do
        post.rating = 6.0
        expect(post).to be_invalid
        expect(post.errors[:rating]).not_to be_empty
      end

      it "評価スコアが負の値の場合、バリデーションに失敗する" do
        post.rating = -1.0
        expect(post).to be_invalid
        expect(post.errors[:rating]).not_to be_empty
      end

      it "ユーザーとお土産の組み合わせが重複している場合、バリデーションに失敗する" do
        create(:post, user: user, souvenir: souvenir)
        duplicate_post = build(:post, user: post.user, souvenir: post.souvenir)
        expect(duplicate_post).to be_invalid
        expect(duplicate_post.errors[:souvenir_id]).not_to be_empty
      end
    end
  end
end
