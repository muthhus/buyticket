class QuipsController < ApplicationController
  
  def index
    list
    render :action => 'list'
  end
  
  def list
    @products = Product.find_products_for_sale
 end
 
  def search
    @quips = Quip.find_text_like(params[:search])
    render :partial=>'search_results' if request.xhr?
  end
end
