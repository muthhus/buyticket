class Upload < ActiveRecord::Base
  belongs_to :block
belongs_to :category
has_and_belongs_to_many :upload
end
