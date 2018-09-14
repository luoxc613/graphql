Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createLink, function: Mutations::CreateLink.new
  field :createUser, function: Mutations::CreateUser.new
end
