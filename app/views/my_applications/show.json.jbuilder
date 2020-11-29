json.extract! @my_application, :id, :position, :company, :location, :job_description, :cover_letter,
              :cv_url, :began_at, :status, :overall_feedback, :tech_stack_list

json.interviews do
  @interviews.each do |date, interviews_on_the_day|
    json.set! date.to_s, interviews_on_the_day do |record|
      json.extract! record, :id, :type_of, :feedback, :interviewer
      json.time record.at.strftime('%H:%M')
    end
  end
end