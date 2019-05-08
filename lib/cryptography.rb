class Cryptography
  KEY         = Rails.application.secrets[:secret_key_base]
  CIPHER_NAME = 'AES-256-CBC'.freeze

  class << self
    def encrypt(plain_text)
      cipher = cipher_instance_for(:encrypt)
      crypt  = cipher.update(plain_text) + cipher.final
      Base64.urlsafe_encode64(crypt)
    end

    def decrypt(encrypted_value)
      cipher = cipher_instance_for(:decrypt)
      crypt  = cipher.update(Base64.urlsafe_decode64(encrypted_value))
      crypt << cipher.final
    rescue ArgumentError => ae
      Rails.logger.error(ae)
      encrypted_value
    end

    private

    def cipher_instance_for(method_name)
      cipher = OpenSSL::Cipher.new(CIPHER_NAME)
      cipher.public_send(method_name)
      cipher.key = KEY[0..31]
      cipher
    end
  end
end
