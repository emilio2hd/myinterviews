require 'cryptography'

class CoverLettersController < ApiController
  before_action :set_cover_letter, only: %i[show update destroy send_email]

  def index
    @cover_letters = CoverLetter.page(params[:page])
  end

  def show
  end

  def send_email
    @cover_letter_email_form = CoverLetterEmailForm.new(cover_letter_email_params)

    if Setting.email.nil?
      no_email_error = I18n.t('cover_letters.messages.email_wasnt_sent_no_email_settings')
      return render json: { message: no_email_error }, status: :bad_request
    end

    if @cover_letter_email_form.valid?
      begin
        CoverLetterMailer.presentation_email(@cover_letter_email_form, Setting.email).deliver_now
        return head :ok
      rescue StandardError
        no_email_sent = I18n.t('cover_letters.messages.email_wasnt_sent')
        return render json: { message: no_email_sent }, status: :internal_server_error
      end
    end

    render json: @cover_letter_email_form, status: :bad_request
  end

  def create
    @cover_letter = CoverLetter.new(cover_letter_params)

    if @cover_letter.save
      render json: @cover_letter
    else
      render json: @cover_letter, status: :bad_request
    end
  end

  def update
    if @cover_letter.update(cover_letter_params)
      render json: @cover_letter
    else
      render json: @cover_letter, status: :bad_request
    end
  end

  def destroy
    @cover_letter.destroy
    head :ok
  end

  private

  def set_cover_letter
    @cover_letter = CoverLetter.find(params[:id])
  end

  def cover_letter_email_params
    params.fetch(:cover_letter_email_form, {}).permit(:subject, :message, :email_to, :attachment)
  end

  def cover_letter_params
    params.fetch(:cover_letter, {}).permit(:title, :content)
  end
end
