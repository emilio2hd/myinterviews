module MyApplicationsHelper
  ICON = { sent:      { title: I18n.t('activerecord.attributes.my_application.statuses.sent'), class: 'bg-blue' },
           no_answer: { title: I18n.t('activerecord.attributes.my_application.statuses.no_answer'), class: 'bg-yellow' },
           ongoing:   { title: I18n.t('activerecord.attributes.my_application.statuses.ongoing'), class: 'bg-orange' },
           canceled:  { title: I18n.t('activerecord.attributes.my_application.statuses.canceled'), class: 'bg-gray' },
           accepted:  { title: I18n.t('activerecord.attributes.my_application.statuses.accepted'), class: 'bg-green' },
           refused:   { title: I18n.t('activerecord.attributes.my_application.statuses.refused'), class: 'bg-red' } }.freeze

  def status_label(enum_type)
    type = enum_type.to_s.to_sym
    content_tag(:span, ICON[type][:title], class: "label #{ICON[type][:class]}")
  end
end
