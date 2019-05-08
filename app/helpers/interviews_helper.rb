module InterviewsHelper
  ICON = { talk:      { icon: 'fa-comments bg-yellow', title: I18n.t('activerecord.attributes.interview.type_ofs.talk') },
           technical: { icon: 'fa-wrench bg-aqua', title: I18n.t('activerecord.attributes.interview.type_ofs.technical') } }.freeze

  def interview_icon(enum_type)
    content_tag(:i, '', class: "fa #{ICON[enum_type.to_s.to_sym][:icon]}", title: ICON[enum_type.to_s.to_sym][:title])
  end
end
