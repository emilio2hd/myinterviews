class RemoveApplicationRequirementFromInterviews < ActiveRecord::Migration[5.1]
  def change
    change_column_null :interviews, :my_application_id, true
  end
end
