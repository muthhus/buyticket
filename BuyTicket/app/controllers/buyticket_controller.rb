class BuyticketController < ApplicationController
  
  # . . 

  def index
   faq
    render :action => 'faq'
  #..@products = Product.find_products_for_sale
end

def buy
  @products = Product.find_products_for_sale
end
   def shanmuga
     
   end
   def faq
     
   end
  
def list
    @products = Product.find_products_for_sale
 end
  
  def sports
  end
def local_event
  
end
  def local_events
  end

  def drama
  end

  def music
  end

  def register
 end

 def contact
  
 end
  
  def movie_home
    
  end
  
  def feedback
    
  end
  
end
