class CheckoutController < ApplicationController
  
   before_filter :registered_user_checkout, :find_cart, :except => :empty_cart
   
  def checkout
    if @cart.items.empty?
      redirect_to_index("Your cart is empty")
    end
  end
  
  def registered_checkout
    @order = Order.new
  end
  
  def empty_cart
    session[:cart] = nil
    redirect_to_index
  end
  
  def save_order
    @order = Order.new(params[:order])  
    @order.add_line_items_from_cart(@cart)
    if @order.save        
      session[:cart] = nil
      redirect_to_index("Thank you for your order")
    else
      render :action => :checkout
    end
  end
  
  private
  
  def redirect_to_index(msg = nil)
    flash[:notice] = msg if msg
    redirect_to :controller =>'shoppingcart', :action => :index
  end
    
  
  def find_cart
    @cart = (session[:cart] ||= Cart.new)
  end
end
