class Quips < ActiveRecord::Base
  belongs_to :author, :class_name => 'product', :foreign_key => 'author_id'
  
  validates_presence_of :text
  attr_accessible :text
  
  def self.find_text_like(value)
    find(:all, :conditions => "text LIKE" + 
        ActiveRecord::Base.connection.quote("%#{value}%"))
  end
end
