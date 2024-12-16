# frozen_string_literal: true

class CreatePageConfigs < ActiveRecord::Migration[7.0]
  def change
    create_table :page_configs do |t|
      t.integer :page, null: false
      t.json :components, null: false
      t.timestamps
    end
  end
end
