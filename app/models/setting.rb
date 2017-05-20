# RailsSettings Model
require 'cryptography'

class Setting < RailsSettings::Base
  namespace Rails.env

  before_save :encrypt_email
  after_find :decrypt_email

  private

  def encrypt_email
    cryptography_do(:encrypt)
  end

  def decrypt_email
    cryptography_do(:decrypt)
  end

  def cryptography_do(method_name)
    self.value = value.merge(password: Cryptography.public_send(method_name, value[:password])) unless value[:password].blank?
  end
end
