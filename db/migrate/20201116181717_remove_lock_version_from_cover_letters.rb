class RemoveLockVersionFromCoverLetters < ActiveRecord::Migration[5.1]
  def change
    remove_column :cover_letters, :lock_version, :integer, default: 0, null: false
  end
end
