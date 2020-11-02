class StaticController < ApplicationController
  layout :static

  def index
    render file: Rails.root.join('public', 'index.html')
  end
end