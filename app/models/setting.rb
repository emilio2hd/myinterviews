# == Schema Information
#
# Table name: settings
#
#  id         :integer          not null, primary key
#  thing_type :string(30)
#  value      :text
#  var        :string           not null
#  created_at :datetime
#  updated_at :datetime
#  thing_id   :integer
#
# Indexes
#
#  index_settings_on_thing_type_and_thing_id_and_var  (thing_type,thing_id,var) UNIQUE
#

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
