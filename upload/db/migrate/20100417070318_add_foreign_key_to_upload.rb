class AddForeignKeyToUpload < ActiveRecord::Migration
  def self.up
    execute "alter table uploads
  add constraint fk_uploads_block
        foreign key (block_id) references blocks(block_id)
  on delete cascade"

  execute "alter table uploads
  add constraint fk_uploads_category
  foreign key (category_id) references categories(category_id)
  on delete cascade"
  end

  def self.down
  end
end
