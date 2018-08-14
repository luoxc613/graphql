import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { EMAIL,PASSWORD,USERID } from '../constants';
import gql from 'graphql-tag';


const QUERY_USER_ID = gql`
	query Query_user_id($searchString: String!){
		user(searchString :$searchString){
			id
			name
			email
		}
	}
`;
class GetUserId extends Component{

	render(){
		const email = localStorage.getItem(EMAIL);
		console.log("before get"+email);
		return(
		<div>
		{console.log("aaa")}
		<Query query={QUERY_USER_ID} variables={{searchString:email}}>
			{({loading, error, data})=>{
					    if(loading) return <p>loading ... </p>
				        if(error) return <p>error</p>
				        console.log(data);
				    	const index=data.length-1;
				    	const userid=data.user[0].id;
				    	localStorage.setItem(USERID, userid);
				    	console.log("after get"+localStorage.getItem(USERID));
				    	return <p></p>
    					}
    				}
		</Query>
		</div>
		)
	}
}

export default GetUserId;