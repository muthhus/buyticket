class UploadController < ApplicationController
  
  def index    
  end
  
  def create
    @upload = Upload.new(params[:item])
    
    if @upload.save
      flash.now[:notice] = 'Item created successfully.'
      flash[:error] = 'There was a error1.'
      # @item = Item.new
      #    redirect_to :action => 'new'
      #     return
    end
    
    unless params[:upload]['upload'].content_type =~ /^/
      flash[:error] = 'Please select an image file to upload.'
      render :action => 'new'
      return
    end
    
    @content = Content.new(params[:upload])
    @content.upload_id =  @upload.id
    
    puts "\n\n** upload_id=> #{@upload.id}."
    puts "\n\n ** content_id => #{@content.upload_id}."
    
    if @content.save
      flash[:notice] = 'Item was successfully created.'
      redirect_to :action => 'list'
    else
      flash[:error] = 'There was a problem2.'
      render :action => 'index'
    end
    
  end
  
  def list
    @list_item = Upload.find_by_sql("select b.block_name, b.post_code,b.build_date,c.category_name, u.expiry_date, u.created_at, u.id, u.block_id from blocks b, categories c, contents t, uploads u where u.block_id = b.block_id and u.category_id = c.category_id and u.id = t.upload_id")
    
    @list = Upload.find_by_sql("select b.block_name,b.post_code,b.build_date,c.category_name,u.expiry_date, u.created_at,u.id from blocks b, categories c, uploads u where u.block_id = b.block_id 
and u.category_id = c.category_id;")
  end
end
