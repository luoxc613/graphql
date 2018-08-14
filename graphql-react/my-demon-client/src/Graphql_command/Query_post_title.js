import gql from 'graphql-tag';

const QUERY_POST_TITLE = gql`
		query query_posts_title($searchString :  String){
			posts(searchString : $searchString){
				  id
    			title
    			content
    			author{
      					id
      					name 
    				}
    			comments{
      			author{
      				name,
    				}
    			content
    			}
			}
		}
`;

export default QUERY_POST_TITLE;