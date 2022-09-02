require 'erb'
require 'json'
require 'ostruct'
require 'date'

def generate(data_path, template_path, output_path)
  template = File.read(template_path)
  data = OpenStruct.new(JSON.parse(File.read(data_path)))
  data['text'].gsub!("\n", '<br/>')
  data['title'].upcase!
  generated = ERB.new(template).result(data.instance_eval { binding })
  File.write(output_path, generated)
end
