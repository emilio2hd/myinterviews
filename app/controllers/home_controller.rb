class HomeController < ApplicationController
  def index
    @applications = MyApplication.last_10.all
    @interviews   = Interview.includes(:my_application).next_10.all
    respond_to :html, :json
  end
end
