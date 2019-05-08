require 'cryptography'

class CoverLettersController < ApplicationController
  before_action :set_cover_letter, only: [:show, :edit, :update, :destroy, :duplicate, :new_email, :send_email]

  def index
    @cover_letters = CoverLetter.all
  end

  def show;
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
      rescue
        logger.error $ERROR_INFO
        flash[:alert] = t('cover_letters.messages.email_wasnt_sent')
      end
    end

    render :new_email
  end

  def edit;
  end

  def create
    @cover_letter = CoverLetter.new(cover_letter_params)

    if @cover_letter.save
      redirect_to @cover_letter, notice: t('messages.successfully_created', entity: t('cover_letters.item'))
    else
      render :new
    end
  end

  def update
    if @cover_letter.update(cover_letter_params)
      redirect_to @cover_letter, notice: t('messages.successfully_updated', entity: t('cover_letters.item'))
    else
      render :edit
    end
  end

  def destroy
    @cover_letter.destroy
    redirect_to cover_letters_url, notice: t('messages.successfully_destroyed', entity: t('cover_letters.item'))
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
