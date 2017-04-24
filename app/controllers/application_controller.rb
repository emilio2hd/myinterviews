class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  rescue_from ActiveRecord::StaleObjectError, with: :handle_stale_object

  def handle_stale_object
    correct_stale_record_version
    stale_record_recovery_action
  end

  protected

  def stale_record_recovery_action
    flash.now[:error] = t('messages.object_has_been_changed')
    render :edit
  end

  def correct_stale_record_version
    raise 'This method must be implemented'
  end
end
