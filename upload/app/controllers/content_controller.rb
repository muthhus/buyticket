class ContentController < ApplicationController
  def show
    @content = Content.find_by_upload_id(params[:id]) 
    send_data(@content.content,
                :filename => @content.name_of_file,
                :type => @content.content_type,
                :disposition => "none")
 end
end
