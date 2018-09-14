require 'test_helper'

class Mutations::CreateUserTest < ActiveSupport::TestCase
	def perform(args={})
		Mutations::CreateUser.new.call(nil, args, nil);
	end

	test 'creating new user' do
		user = perform(name: 'test', authProvider:{
			email_pw:{
				email: "example@gmail.com",
				password: "123456"
			}
		})
		assert user.persisted?
		assert_equal user.name, 'test'
		assert_equal user.email, 'example@gmail.com'
	end
end
