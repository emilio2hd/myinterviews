# frozen_string_literal: true

require 'openssl'
require 'base64'
require 'cryptography'

class SettingsController < ApplicationController
  def index
    email_settings      = Setting.email || {}
    @setting_email_form = SettingEmailForm.new(email_settings.symbolize_keys.except(:password))
  end

  def update_all
    @setting_email_form = SettingEmailForm.new(setting_params[:email])

    if @setting_email_form.valid?
      email_setting = @setting_email_form.serializable_hash.symbolize_keys

      Setting.merge!(:email, email_setting)

      return redirect_to settings_path, notice: t('messages.successfully_updated', entity: 'Settings')
    end

    render :index
  end

  private

  def setting_params
    params.fetch(:setting, {})
          .permit(email: %i[from reply_to user_name password domain address port enable_starttls_auto authentication])
  end
end
