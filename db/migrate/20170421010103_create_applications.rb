class CreateApplications < ActiveRecord::Migration[5.0]
  def change
    create_table :my_applications do |t|
      t.string :position, limit: 255, null: false
      t.string :company, limit: 255, null: false
      t.string :location, limit: 255, null: false
      t.text :job_description
      t.text :cover_letter
      t.string :cv_url, limit: 255, null: false
      t.date :began_at, null: false
      t.integer :status, default: 0
      t.integer :lock_version, default: 0, null: false

      t.timestamps
    end
  end
end
