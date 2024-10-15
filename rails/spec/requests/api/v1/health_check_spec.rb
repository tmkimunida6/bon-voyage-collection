require 'rails_helper'

RSpec.describe "Api::V1::HealthChecks", type: :request do
  describe "GET /api/v1/health_check" do
    it "正常なレスポンスが返却される" do
      get(api_v1_health_check_path)
      res = JSON.parse(response.body)
      expect(res["message"]).to eq("Success Health Check")
      expect(response).to have_http_status(:ok)
    end
  end
end
