require 'cryptography'

class CoverLettersController < ApplicationController
  before_action :set_cover_letter, only: %i[show edit update destroy duplicate new_email send_email]

  def index
    @cover_letters = CoverLetter.page(params[:page])
    respond_to :html, :json
  end

  def show
    respond_to :html, :json
  end

  def new
    @cover_letter = CoverLetter.new
  end

  def duplicate
    @cover_letter       = CoverLetter.new @cover_letter.attributes
    @cover_letter.title = "#{@cover_letter.title} [#{t('messages.copy')}]"
    render :new
  end

  def new_email
    flash[:alert]                    = t('cover_letters.messages.no_email_settings') if Setting.email.nil?
    @cover_letter_email_form         = CoverLetterEmailForm.new
    @cover_letter_email_form.message = @cover_letter.content
  end

  def send_email
    @cover_letter_email_form = CoverLetterEmailForm.new(cover_letter_email_params)

    if Setting.email.nil?
      flash[:alert] = t('cover_letters.messages.email_wasnt_sent_no_email_settings')
      return render :new_email
    end

    if @cover_letter_email_form.valid?
      begin
        CoverLetterMailer.presentation_email(@cover_letter_email_form, Setting.email).deliver_now
        return redirect_to @cover_letter, notice: t('cover_letters.messages.email_sent')
      rescue StandardError => e
        logger.error e
        flash[:alert] = t('cover_letters.messages.email_wasnt_sent')
      end
    end

    render :new_email
  end

  def edit
  end

  def create
    @cover_letter = CoverLetter.new(cover_letter_params)

    respond_to do |format|
      if @cover_letter.save
        format.html { redirect_to @cover_letter, notice: t('messages.successfully_created', entity: t('cover_letters.item')) }
        format.json { render json: @cover_letter, status: :ok }
      else
        format.html { render :new }
        format.json { render json: @cover_letter, status: :bad_request }
      end
    end
  end

  def update
    respond_to do |format|
      if @cover_letter.update(cover_letter_params)
        format.html { redirect_to @cover_letter, notice: t('messages.successfully_updated', entity: t('cover_letters.item')) }
        format.json { render json: @cover_letter, status: :ok }
      else
        format.html { render :edit }
        format.json { render json: @cover_letter, status: :bad_request }
      end
    end
  end

  def destroy
    @cover_letter.destroy

    respond_to do |format|
      format.html { redirect_to cover_letters_url, notice: t('messages.successfully_destroyed', entity: t('cover_letters.item')) }
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
