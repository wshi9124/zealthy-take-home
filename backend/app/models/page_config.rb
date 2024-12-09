class PageConfig < ApplicationRecord
    validates :components, presence: true
    validates :page, presence: true, uniqueness: true

end