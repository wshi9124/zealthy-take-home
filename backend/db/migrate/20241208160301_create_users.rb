# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.text :about_me
      t.string :street_address
      t.string :city
      t.string :state
      t.string :zip
      t.date :birthdate

      t.timestamps
    end
  end
end
