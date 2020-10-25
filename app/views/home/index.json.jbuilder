json.applications @applications do |application|
  json.extract! application, :id, :company, :position, :status, :began_at
end

json.interviews @interviews do |interview|
  json.extract! interview, :id
  json.at localize(interview.at, format: :resumed)
  json.application interview.my_application.position
end