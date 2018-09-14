class Mutations::CreateUser < GraphQL::Function
	AuthProviderInput = GraphQL::InputObjectType.define do
		name 'AuthProviderSignupData'

		argument :email_pw, Types::AuthProviderEmailInput
	end

	argument :name, !types.String
	argument :authProvider, !AuthProviderInput

	type Types::UserType

	def call(_obj, args, _ctx)
		User.create!(
				name: args[:name],
				email: args[:authProvider][:email_pw][:email],
				password: args[:authProvider][:email_pw][:password]
			)
	end
end