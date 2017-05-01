class RemoveMandatoryOfResumeUrlAddFeedbackFromApplications < ActiveRecord::Migration[5.0]
  #add_feedback_from_applications
  def self.up
    change_column_null :my_applications, :cv_url, true
    add_column :my_applications, :overall_feedback, :text, null: true, default: ''
  end

  def self.down
    remove_column :my_applications, :overall_feedback
    change_column_null :my_applications, :cv_url, false, ''
  end
end
