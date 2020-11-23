class HomeController < ApiController
  def index
    @applications = MyApplication.last_10.all
    @interviews   = Interview.next_10.all
  end
end
