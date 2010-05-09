class LoginController < ApplicationController
  before_filter :authorize, :except => [:login, :drama, :local_event, :login_for_checkout,:movie_home, :index]
  
  layout "admin"
  
   def index
    @total_orders = Order.count
   end
  
  def login
    session[:user_id] = nil
    if request.post?
      user = User.authenticate(params[:name], params[:password])
      if user
        session[:user_id] = user.id
        redirect_to :action => 'list_users'
      else
        flash.now[:notice] = 'Invalid user/password combination'
      end
    end
  end
  
  def login_for_checkout
    session[:user_id] = nil
    if request.post?
      user = User.authenticate(params[:name], params[:password])
      if user
        session[:user_id] = user.id
        redirect_to :controller =>'checkout', :action => 'registered_checkout'
      else
        flash.now[:notice] = 'Login (Existing Customer) / Registration (New Customer) is required'
      end
    end
  end
  
  def add_user
    @user = User.new(params[:user])
    if request.post? and @user.save
       flash.now[:notice] = "User #{@user.name} created"
      @user = User.new
    end
  end
  
  def delete_user
    if request.post?
      user = User.find(params[:id])
      begin
        user.destroy
        flash[:notice] = "User #{user.name} deleted"
      rescue Exception => e
        flash[:notice] = e.message
      end
    end
    redirect_to(:action => :list_users)
  end
  
  def list_users
    @all_users = User.find(:all)
  end
  
  
  
  def logout
    session[:user_id] = nil
    flash[:notice] = 'Logged out'
    redirect_to :action => 'index'
  end
  
  
  
  
end
