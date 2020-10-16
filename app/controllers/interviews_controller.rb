class InterviewsController < ApplicationController
  before_action :set_interview, only: %i[show edit update destroy]
  before_action :load_applications, only: %i[new edit]

  def index
    @interviews = Interview.includes(:my_application).ordered_by_last.page(params[:page])
    respond_to :html, :json
  end

  def show
    respond_to :html, :json
  end

  def new
    @interview = Interview.new(my_application_id: params[:my_application_id])
  end

  def edit
  end

  def create
    @interview = Interview.new(interview_params)

    respond_to do |format|
      if @interview.save
        format.html { redirect_to @interview, notice: t('messages.successfully_created', entity: t('interviews.item')) }
        format.json { render json: @interview, status: :ok }
      else
        format.html {
          load_applications
          render :new 
        }
        format.json { render json: @cover_letter, status: :bad_request }
      end
    end
  end

  def update
    respond_to do |format|
      if @interview.update(interview_params)
        format.html { redirect_to @interview, notice: t('messages.successfully_updated', entity: t('interviews.item')) }
        format.json { render json: @interview, status: :ok }
      else
        format.html {
          load_applications
          render :edit 
        }
        format.json { render json: @cover_letter, status: :bad_request }
      end
    end
  end

  def destroy
    @interview.destroy

    respond_to do |format|
      format.html { redirect_to interviews_path, notice: t('messages.successfully_destroyed', entity: t('interviews.item')) }
      format.json { head :ok }
    end
  end

  protected

  def correct_stale_record_version
    @interview.reload
  end

  private

  def load_applications
    @applications = MyApplication.all
  end

  def set_interview
    @interview = Interview.includes(:my_application).find(params[:id])
  end

  def interview_params
    params.fetch(:interview, {}).permit(:interviewer_name, :interviewer_email, :at, :type_of, :lock_version,
                                        :my_application_id, :notes, :feedback)
  end
end
