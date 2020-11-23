class MyApplicationsController < ApiController
  before_action :set_my_application, only: %i[show update destroy]

  def index
    @my_applications = MyApplication.ordered_by_last.page(params[:page])
  end

  def show
    @interviews = Interview.where(my_application_id: @my_application.id)
                           .ordered_by_last.group_by { |i| localize(i.at, format: :only_date) }
  end

  def create
    @my_application = MyApplication.new(my_application_params)

    if @my_application.save
      render json: @my_application
    else
      render json: @my_application, status: :bad_request
    end
  end

  def update
    if @my_application.update(my_application_params)
      render json: @my_application
    else
      render json: @my_application, status: :bad_request
    end
  end

  def destroy
    @my_application.destroy

    head :ok
  end

  private

  def set_my_application
    @my_application = MyApplication.includes(:taggings).find(params[:id])
  end

  def my_application_params
    params.fetch(:my_application, {}).permit(:position, :company, :began_at, :location, :cv_url, :status,
                                             :job_description, :cover_letter, :overall_feedback, tech_stack_list: [])
  end
end
