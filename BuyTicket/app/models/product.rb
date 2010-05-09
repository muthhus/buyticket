class Product < ActiveRecord::Base
  validates_presence_of(:name,:price,:image_url,:category,:description,:starring,:Music,:Producer)
  validates_numericality_of(:price)
  validates_uniqueness_of(:name, :message => "unique name message")
  validates_format_of(:image_url,
                      :with => %r{\.(gif|jpg|png)$}i,
                      :message => "must be a URL for a GIF, JPG or PNG image")
                      
#..
 def self.find_products_for_sale
   find(:all, :order => 'name')
 end
  
  protected
  def validiate
    errors.add(:price, "should be atleast 0.01") if price.nil? || price <0.01
  end
end
