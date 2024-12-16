# frozen_string_literal: true

class PageConfig < ApplicationRecord
  validates :components, presence: true
  validates :page, presence: true, uniqueness: true
end
