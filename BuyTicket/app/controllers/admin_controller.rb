class AdminController < ApplicationController
  before_filter :authorize
  
  #..
  def index
  list_product
  render :action => 'list_product'
 end


  # Create
  def add_new
    @product = Product.new(params[:product])
    if @product.save
      flash[:notice]='Product was successfully Added.'
      redirect_to :action => 'list_product'
    else
      render :action => 'add_product'
    end
  end
  
  #new
  def add_product
    @product = Product.new
  end
  
  def edit
    @product = Product.find(params[:id])
  end
  
  #update
  
  def update
    @product = Product.find(params[:id])
    if @product.update_attributes(params[:product])
      flash[:notice] = "Product was successfully updated."
      redirect_to :action => 'show', :id=>@product
    else
      render :action =>'edit'
    end
  end
  #delete
   def destroy
    @product = Product.find(params[:id]).destroy
    redirect_to :action => 'list_product'
  end
  
  #list
  def list_product
    @products = Product.find(:all,:order =>'name')
    #@product_pages, @products = paginate :products, :per_page => 2
  end
  #show
  def show
    @product =Product.find(params[:id])
  end
  
end
