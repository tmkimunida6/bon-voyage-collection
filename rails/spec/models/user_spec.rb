require 'rails_helper'

RSpec.describe User, type: :model do
  describe "新規登録" do
    let(:user) { build(:user) }

    context "成功" do
      it "正しく情報が入力された場合、バリデーションに成功する" do
        expect(user).to be_valid
        expect(user.errors).to be_empty
      end
    end

    context "失敗" do
      it "メールアドレスが空の場合、バリデーションに失敗する" do
        user.email = nil
        expect(user).to be_invalid
        expect(user.errors[:email]).not_to be_empty
      end

      it "パスワードが空の場合、バリデーションに失敗する" do
        user.password = nil
        expect(user).to be_invalid
        expect(user.errors[:password]).not_to be_empty
      end

      it "メールアドレスの形式が誤っている場合、バリデーションに失敗する" do
        user_with_invalid_email = build(:user, email: "invalid")
        expect(user_with_invalid_email).to be_invalid
        expect(user_with_invalid_email.errors[:email]).not_to be_empty
      end

      it "パスワードが7文字以下の場合、バリデーションに失敗する" do
        user_with_short_password = build(:user, password: "short")
        expect(user_with_short_password).to be_invalid
        expect(user_with_short_password.errors[:password]).not_to be_empty
      end

    end
  end
end
