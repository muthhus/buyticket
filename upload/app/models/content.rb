class Content < ActiveRecord::Base
  has_and_belongs_to_many :uploads  

  def upload=(image_field)
    self.name_of_file = base_part_of(image_field.original_filename)
    self.content_type = image_field.content_type.chomp
    self.content = image_field.read
  end

  def base_part_of(file_name)
    name = File.basename(file_name)
    name.gsub(/[^\w._-]/, '')
  end
end
