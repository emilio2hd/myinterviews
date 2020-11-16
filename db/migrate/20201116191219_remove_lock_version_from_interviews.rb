class RemoveLockVersionFromInterviews < ActiveRecord::Migration[5.1]
  def change
    remove_column :interviews, :lock_version, :integer, default: 0, null: false
  end
end
