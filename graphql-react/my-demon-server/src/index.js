const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    
    posts: (_, args, context, info) => {
      return context.prisma.query.posts(
        {
          where: {
            OR: [
              { title_contains: args.searchString },
              { content_contains: args.searchString },
              {id:args.searchString},
              {
                author:{
                  id:args.searchString,
                }
              }
            ],
          },
        },
        info,
      )
    },
    user: (_, args, context, info) => {
      return context.prisma.query.users(
        {
          where: {
            OR:[
                
                { id: args.searchString},
                { email:args.searchString}

              ],
          },
        },
        info,
      )
    },
    comments_postId: (_, args, context, info) => {
      return context.prisma.query.commentses(
        {
          where: {
            post:{
              id: args.id,
            }
          }
        },
        info,
      )
    },

    posts_by_uid:(_, args, context, info)=>{
      return context.prisma.query.posts(
        {
          where:{
            author:{
              id:args.id,
            },
          }
        },
        info,
      )
    },

    
  },

  Mutation: {
    createDraft: (_, args, context, info) => {
      return context.prisma.mutation.createPost(
        {
          data: {
            title: args.title,
            content: args.content,
            author: {
              connect: {
                id: args.authorId,
              },
            },
          },
        },
        info,
      )
    },
     publish: (_, args, context, info) => {
      return context.prisma.mutation.updatePost(
        {
          where: {
            id: args.id,
          },
          data: {
            published: true,
          },
        },
        info,
      )
    },

    deletePost: (_, { id }, ctx, info) => {
      return ctx.db.mutation.deletePost({ where: { id } }, `{ id }`)
    },

    createUser:(_,args,context,info) => {
      return context.prisma.mutation.createUser(
        {
          data:{
            name:args.name,
            email:args.email,
            password:args.password,
            login: true,
          }
        },
        info,
      )
    },

    createComment: (_, args, context, info) => {
      return context.prisma.mutation.createComments(
          {
            data:{
              content: args.content,
              author:{
                connect:{id:args.user_id},
              },
              post: {
                connect:{id:args.post_id},
              },
            },
          },
          info,
        )
    },

    userLogin:(_, args, context, info) =>{
      return context.prisma.mutation.updateManyUsers(
        {
          where:{
            AND:[
                  {email: args.email},
                  {password: args.password},
                ]
          },
          data:{
            login:args.status,
          }
        },
        info,
      )
    },
  },
}

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
    }),
  }),
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))
