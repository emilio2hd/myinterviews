class SettingEmailForm
  include ActiveModel::Model
  include ActiveModel::Serialization

  attr_accessor :from, :user_name, :password, :domain, :reply_to, :address, :port, :enable_starttls_auto, :authentication
  validates :address, :port, :from, presence: true
  # Email validation from http://api.rubyonrails.org/classes/ActiveModel/Validations/ClassMethods.html#method-i-validates
  validates :from, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates :port, numericality: true

  def attributes
    { 'from' => '', 'reply_to' => '', 'user_name' => '', 'password' => '', 'domain' => '', 'address' => '',
      'port' => '', 'enable_starttls_auto' => '', 'authentication' => '' }
  end
end
