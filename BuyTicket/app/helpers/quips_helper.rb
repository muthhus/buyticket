module QuipsHelper
  # See http://en.wikipedia.org/wiki/Bowdler
  def bowdlerize_four_lettered(str)
    h(str.to_s.gsub(/\b\w{4}\b/, '!@#$'))
  end
  alias_method :bfl, :bowdlerize_four_lettered
end
