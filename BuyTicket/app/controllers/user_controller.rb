class UserController < ApplicationController
  
  def index
    list
    render :action => 'list'
  end
  
  def list
   #.. @search = ""
    @user_pages, @users = paginate(:users, :order => 'name')
  end
  
  def search_users
    list
  end
  
  private 
  
  def order_from_params
    if params[:form_sort] && params[:form_sort].size > 0
      params[:form_sort].downcase.split(",").map { |x| 
        x.tr(" ", "_")
      }.join(" ")
    else
      "username"
    end
  end
  
  def search
    unless params[:search].blank?
      @user_pages, @users = paginate :users,
        :per_page =>2,
        :order => order_form_params,
        :conditions => User.conditions_by_like(params[:search])
       logger.info @users.size
     else
       list
   end
   render :partial => 'search', :layout => false
  end
end
