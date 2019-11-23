class CoverLetterMailer < ApplicationMailer
  def presentation_email(email_from, email_config)
    @message = email_from.message
    # it is necessary symbolize_keys, because Hash does not merge well with HashWithIndifferentAccess
    delivery_method_options = email_config.symbolize_keys.delete_if { |_, value| value.blank? }

    if email_from.attachment?
      attachment_tmp_path = File.absolute_path(email_from.attachment.tempfile)

      attachments[email_from.attachment.original_filename] = File.read(attachment_tmp_path)
    end

    mail(to: email_from.email_to,
         from: email_config[:from],
         reply_to: email_config[:reply_to],
         subject: email_from.subject,
         delivery_method_options: delivery_method_options)
  end
end
