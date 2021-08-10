# frozen_string_literal: true

module EnumHelper
  def options_for_enum(object, attribute)
    klass   = object.class
    options = enums_to_translated_options(klass, attribute.to_s.pluralize)
    options_for_select(options, object.send(attribute))
  end

  def translate_enum(object, attribute)
    enum_value = object.send(attribute)
    translated_enum(object.class, attribute.to_s.pluralize, enum_value)
  end

  private

  def enums_to_translated_options(klass, attribute)
    enum_values = klass.send(attribute)
    enum_values.map { |enum, _| [translated_enum(klass, attribute, enum), enum] }.reject { |enum, _| enum.blank? }
  end

  def translated_enum(klass, enum, enum_value, default = enum_value.to_s.titleize)
    key = "activerecord.attributes.#{klass.to_s.underscore.tr('/', '_')}.#{enum}.#{enum_value}"
    I18n.t(key, default: default)
  end
end
