require 'openssl'
require 'base64'
require 'cryptography'

class SettingsController < ApplicationController
  def index
    email_settings      = Setting.email || {}
    @setting_email_form = SettingEmailForm.new(email_settings.symbolize_keys.except(:password))

    respond_to :json
  end

  def update_all
    @setting_email_form = SettingEmailForm.new(setting_params[:email])

    respond_to do |format|
      if @setting_email_form.valid?
        email_setting = @setting_email_form.serializable_hash.symbolize_keys
        Setting.merge!(:email, email_setting)

        format.json { return render json: @setting_email_form, status: :ok }
      end

      format.json { render json: @setting_email_form, status: :bad_request }
    end
  end

  private

  def setting_params
    params.fetch(:setting, {})
          .permit(email: %i[from reply_to user_name password domain address port enable_starttls_auto authentication])
  end
end
