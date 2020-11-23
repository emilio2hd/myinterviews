require 'openssl'
require 'base64'
require 'cryptography'

class SettingsController < ApiController
  def index
    email_settings      = Setting.email || {}
    @setting_email_form = SettingEmailForm.new(email_settings.symbolize_keys.except(:password))
  end

  def update_all
    @setting_email_form = SettingEmailForm.new(setting_params[:email])

    if @setting_email_form.valid?
      email_setting = @setting_email_form.serializable_hash.symbolize_keys
      Setting.merge!(:email, email_setting)

      return render json: @setting_email_form
    end

    render json: @setting_email_form, status: :bad_request
  end

  private

  def setting_params
    params.fetch(:setting, {})
          .permit(email: %i[from reply_to user_name password domain address port enable_starttls_auto authentication])
  end
end
