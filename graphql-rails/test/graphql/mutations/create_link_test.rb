require 'test_helper'

class Mutations::CreateLinkTest < ActiveSupport::TestCase
	def perform ( args = {} )
		Mutations::CreateLink.new.call(nil, args,{})
	end

	test 'creating new link ' do 
		link = perform(
				url:'www.amazon.com',
				description:'shopping',
			)

		assert link.persisted?
		assert_equal link.description, 'shopping'
		assert_equal link.url, 'www.amazon.com'
	end
end
