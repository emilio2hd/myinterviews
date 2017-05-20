class CreateCoverLetters < ActiveRecord::Migration[5.0]
  def change
    create_table :cover_letters do |t|
      t.string :title
      t.text :content
      t.integer :lock_version, default: 0, null: false
      t.timestamps
    end
  end
end
