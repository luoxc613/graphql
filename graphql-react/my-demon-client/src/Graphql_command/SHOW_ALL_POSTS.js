import gql from 'graphql-tag';

const SHOW_ALL_POSTS= gql`
		query {
			posts{
				  id
    			title
    			author{
      					id
      					name 
    				}
    			 			
        }
		}
`;

export default SHOW_ALL_POSTS;