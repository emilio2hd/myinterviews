require 'cryptography'

class CoverLettersController < ApplicationController
  before_action :set_cover_letter, only: %i[show update destroy send_email]

  def index
    @cover_letters = CoverLetter.page(params[:page])
    respond_to :json
  end

  def show
    respond_to :json
  end

  def send_email
    @cover_letter_email_form = CoverLetterEmailForm.new(cover_letter_email_params)

    if Setting.email.nil?
      respond_to do |format|
        no_email_error = t('cover_letters.messages.email_wasnt_sent_no_email_settings')
        format.json { return render json: { message: no_email_error }, status: :bad_request }
      end
    end

    respond_to do |format|
      if @cover_letter_email_form.valid?
        begin
          CoverLetterMailer.presentation_email(@cover_letter_email_form, Setting.email).deliver_now
          format.json { return render json: @cover_letter, status: :ok }
        rescue StandardError => e
          no_email_sent = t('cover_letters.messages.email_wasnt_sent')
          format.json { return render json: { message: no_email_sent }, status: :internal_server_error }
        end
      else
        format.json { return render json: @cover_letter_email_form, status: :bad_request }
      end
    end
  end

  def create
    @cover_letter = CoverLetter.new(cover_letter_params)

    respond_to do |format|
      if @cover_letter.save
        format.json { render json: @cover_letter, status: :ok }
      else
        format.json { render json: @cover_letter, status: :bad_request }
      end
    end
  end

  def update
    respond_to do |format|
      if @cover_letter.update(cover_letter_params)
        format.json { render json: @cover_letter, status: :ok }
      else
        format.json { render json: @cover_letter, status: :bad_request }
      end
    end
  end

  def destroy
    @cover_letter.destroy

    respond_to do |format|
      format.json { head :ok }
    end
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
