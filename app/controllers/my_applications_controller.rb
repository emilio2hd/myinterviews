class MyApplicationsController < ApplicationController
  before_action :set_my_application, only: %i[show update destroy]

  def index
    @my_applications = MyApplication.ordered_by_last.page(params[:page])
    respond_to :json
  end

  def show
    @interviews = Interview.where(my_application_id: @my_application.id)
                           .ordered_by_last.group_by { |i| localize(i.at, format: :only_date) }
    
    respond_to :json
  end

  def create
    @my_application = MyApplication.new(my_application_params)

    respond_to do |format|
      if @my_application.save
        format.json { render json: @my_application, status: :ok }
      else
        format.json { render json: @my_application, status: :bad_request }
      end
    end
  end

  def update
    respond_to do |format|
      if @my_application.update(my_application_params)
        format.json { render json: @my_application, status: :ok }
      else
        format.json { render json: @my_application, status: :bad_request }
      end
    end
  end

  def destroy
    @my_application.destroy

    respond_to do |format|
      format.json { head :ok }
    end
  end

  protected

  def correct_stale_record_version
    @my_application.reload
  end

  private

  def set_my_application
    @my_application = MyApplication.includes(:taggings).find(params[:id])
  end

  def my_application_params
    params.fetch(:my_application, {}).permit(:position, :company, :began_at, :location, :cv_url, :status,
                                             :job_description, :cover_letter, :lock_version, :overall_feedback,
                                             tech_stack_list: [])
  end
end
