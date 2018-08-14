import gql from 'graphql-tag';
const LOGIN_OUT=gql`
	mutation Login($email: String!, $password: String!, $status: Boolean!){
		userLogin(email : $email, password: $password, status:$status){
			count
		}
	}
`;

export default LOGIN_OUT;