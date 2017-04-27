class MyApplicationsController < ApplicationController
  before_action :set_my_application, only: [:show, :edit, :update, :destroy]

  def index
    @my_applications = MyApplication.ordered_by_last.all
  end

  def show
    @interviews = Interview.where(my_application_id: @my_application.id)
                           .ordered_by_last.group_by { |i| localize(i.at, format: :only_date) }
  end

  def new
    @my_application = MyApplication.new
  end

  def edit
  end

  def create
    @my_application = MyApplication.new(my_application_params)

    if @my_application.save
      redirect_to @my_application, notice: t('messages.successfully_created', entity: t('my_applications.item'))
    else
      render :new
    end
  end

  def update
    if @my_application.update(my_application_params)
      redirect_to @my_application, notice: t('messages.successfully_updated', entity: t('my_applications.item'))
    else
      render :edit
    end
  end

  def destroy
    @my_application.destroy
    redirect_to my_applications_url, notice: t('messages.successfully_destroyed', entity: t('my_applications.item'))
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
                                             :job_description, :cover_letter, :lock_version, tech_stack_list: [])
  end
end
