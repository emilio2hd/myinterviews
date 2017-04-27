class CreateInterviews < ActiveRecord::Migration[5.0]
  def change
    create_table :interviews do |t|
      t.datetime :at, null: false
      t.string :interviewer_name, limit: 255
      t.string :interviewer_email, limit: 255
      t.integer :type_of, null: false, default: 0
      t.references :my_application, null: false, foreign_key: true
      t.text :notes
      t.text :feedback
      t.integer :lock_version, default: 0, null: false
    end
  end
end
