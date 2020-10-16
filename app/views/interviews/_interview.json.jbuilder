json.extract! item, :id, :my_application_id, :interviewer_name, :interviewer_email, :type_of, :notes, :feedback, :at
json.application_position item.my_application.position
json.company_name item.my_application.company