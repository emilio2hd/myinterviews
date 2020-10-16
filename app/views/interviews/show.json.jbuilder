json.extract! @interview, :id, :my_application_id, :interviewer_name, :interviewer_email, :type_of, :notes, :feedback, :at
json.application_position @interview.my_application.position
json.company_name @interview.my_application.company