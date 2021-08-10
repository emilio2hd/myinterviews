# frozen_string_literal: true

module ApplicationHelper
  def content_header(page_title, page_subtitle = nil)
    content_for :content_header do
      tag.h1 do
        concat page_title.to_s
        concat tag.small page_subtitle.to_s if page_subtitle.present?
      end
    end
  end

  def show_validation_errors(errors)
    return '' if errors.blank?

    label_collection = errors.collect do |error|
      tag.span(class: 'help-block margin-bottom-none') do
        concat tag.i(class: 'fa fa-warning')
        concat ' '
        concat error
      end
    end

    safe_join(label_collection)
  end

  def active_if_current_page(path, exact_path = false)
    'active' if current_page_controller? path, exact_path
  end

  private

  def current_page_controller?(path, exact_path)
    fullpath = controller.request.fullpath
    exact_path ? fullpath.eql?(path) : fullpath.start_with?(path)
  end
end
