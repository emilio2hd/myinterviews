class CoverLetterMailer < ApplicationMailer
  def presentation_email(cover_letter_email_form, email_config)
    @message = cover_letter_email_form.message
    # it is necessary symbolize_keys, because Hash does not merge well with HashWithIndifferentAccess
    delivery_method_options = email_config.symbolize_keys.delete_if { |_, value| value.blank? }

    if cover_letter_email_form.attachment?
      attachment_tmp_path = File.absolute_path(cover_letter_email_form.attachment.tempfile)
      attachments[cover_letter_email_form.attachment.original_filename] = File.read(attachment_tmp_path)
    end

    mail(to: cover_letter_email_form.email_to,
         from: email_config[:from],
         reply_to: email_config[:reply_to],
         subject: cover_letter_email_form.subject,
         delivery_method_options: delivery_method_options)
  end
end
