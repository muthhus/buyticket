class AddForeignKeyToContent < ActiveRecord::Migration
  def self.up
    execute "alter table contents
  add constraint fk_contents_upload
  foreign key (upload_id) references uploads(id)
  on delete cascade"
  end

  def self.down
  end
end
