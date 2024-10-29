require 'yaml'

# カテゴリー
def create_categories(categories, parent = nil)
  categories.each do |category_data|
    begin
      children = category_data.delete('children')
      category = Category.create(category_data.merge(parent: parent))
      create_categories(children, category) if children
    rescue => e
      puts "Invalid category data: #{category_data} #{e.message}"
    end
  end
end

categories_data = YAML.load_file(Rails.root.join('db/seeds/categories.yml'))
create_categories(categories_data['categories'])
