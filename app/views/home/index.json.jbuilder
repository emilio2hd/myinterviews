json.applications @applications do |application|
  json.extract! application, :id, :company, :position, :status
end

json.interviews @interviews do |interview|
  json.extract! interview, :id
  json.at localize(interview.at, format: :resumed)
  json.interviewer_name interview.interviewer_name
end