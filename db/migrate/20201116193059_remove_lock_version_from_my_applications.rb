class RemoveLockVersionFromMyApplications < ActiveRecord::Migration[5.1]
  def change
    remove_column :my_applications, :lock_version, :integer, default: 0, null: false
  end
end
