class InterviewsController < ApplicationController
  before_action :set_interview, only: %i[show update destroy]

  def index
    @interviews = Interview.includes(:my_application).ordered_by_last.page(params[:page])
    respond_to :json
  end

  def show
    respond_to :json
  end

  def create
    @interview = Interview.new(interview_params)

    respond_to do |format|
      if @interview.save
        format.json { render json: @interview, status: :ok }
      else
        format.json { render json: @cover_letter, status: :bad_request }
      end
    end
  end

  def update
    respond_to do |format|
      if @interview.update(interview_params)
        format.json { render json: @interview, status: :ok }
      else
        format.json { render json: @cover_letter, status: :bad_request }
      end
    end
  end

  def destroy
    @interview.destroy

    respond_to do |format|
      format.json { head :ok }
    end
  end

  protected

  def correct_stale_record_version
    @interview.reload
  end

  private

  def set_interview
    @interview = Interview.includes(:my_application).find(params[:id])
  end

  def interview_params
    params.fetch(:interview, {}).permit(:interviewer_name, :interviewer_email, :at, :type_of, :lock_version,
                                        :my_application_id, :notes, :feedback)
  end
end
