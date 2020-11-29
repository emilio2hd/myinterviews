partial_options = nil

# rubocop:disable Style/IfUnlessModifier
if defined?(colletion_item_partial) && colletion_item_partial.present?
  partial_options = { partial: colletion_item_partial, as: :item }
end
# rubocop:enable Style/IfUnlessModifier

json.data(collection, partial_options)
json.current_page collection.current_page
json.prev_page collection.prev_page
json.next_page collection.next_page
json.page_size collection.limit_value
json.pages collection.total_pages
json.total_count collection.total_count
json.is_empty collection.empty?