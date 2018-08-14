import gql from 'graphql-tag';

const MUTATION_ADD_COMMENTS = gql`
		mutation mutation_add_comments($content: String!, $user_id: ID!, $post_id:ID!){
			createComment(content:$content, user_id: $user_id, post_id: $post_id){
				  id
          content
          author{
            name
          }
          post{
            content
            title
          }
			 }
		}
`;

export default MUTATION_ADD_COMMENTS;