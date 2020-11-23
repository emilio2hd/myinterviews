class InterviewsController < ApiController
  before_action :set_interview, only: %i[show update destroy]

  def index
    @interviews = Interview.includes(:my_application).ordered_by_last.page(params[:page])
  end

  def show
  end

  def create
    @interview = Interview.new(interview_params)

    if @interview.save
      render json: @interview
    else
      render json: @cover_letter, status: :bad_request
    end
  end

  def update
    if @interview.update(interview_params)
      render json: @interview
    else
      render json: @cover_letter, status: :bad_request
    end
  end

  def destroy
    @interview.destroy

    head :ok
  end

  private

  def set_interview
    @interview = Interview.includes(:my_application).find(params[:id])
  end

  def interview_params
    params.fetch(:interview, {}).permit(:interviewer_name, :interviewer_email, :at, :type_of,
                                        :my_application_id, :notes, :feedback)
  end
end
