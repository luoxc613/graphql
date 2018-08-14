import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import QUERY_POST_TITLE from '../Graphql_command/Query_post_title';
import MUTATION_ADD_COMMENTS from '../Graphql_command/Mutation_add_comments';
import { USERID,EMAIL } from '../constants';
import gql from 'graphql-tag';
 
const PUBLISH = gql`
	mutation Publish($authorId:ID!, $title: String!, $content: String!){
		createDraft(authorId: $authorId, title: $title, content: $content){
			id
			content
			title
			author{
				id
				name
			}
		}
	}

`;

 
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

      		 
class Publish extends Component{
	constructor(props){
		super(props);
		this.state={
			content:"",
			user_id:"",
			title:"",
		};
	}
	 
	handleOnchangeTitle(e){
		e.preventDefault();
		this.setState({
			title:e.target.value,
		})
	}
	handleOnchangeContent(e){
		e.preventDefault();
		this.setState({
			content:e.target.value,
		})
	}

	redirect(){

            
            this.props.history.push(`/`);
      }
	render(){
		const userId = localStorage.getItem(USERID);
		const email  = localStorage.getItem(EMAIL);
  		if(email===null) return (<div>sorry login first</div>)
		return (
			
			<div>
				<p>publish articles:</p>
				<div>
					title: <input value={this.state.title} onChange = {e => this.handleOnchangeTitle(e)}/>		 
					content:<input value = {this.state.content} onChange={ e => this.handleOnchangeContent(e)}/>

					<Mutation mutation={PUBLISH} 
							  variables={{content: this.state.content, title:this.state.title, authorId:userId}}
							 	onCompleted = {()=>this.redirect()}
							   update = {(store,{data:{createDraft}})=>{
							   	console.log(store);
							   	try {
					                let newData = store.readQuery({ query: SHOW_ALL_POSTS});
					                console.log(newData);
					               	newData.posts.push(createDraft);
					               	console.log(newData);
					                store.writeQuery({ query: SHOW_ALL_POSTS, data: newData   });
					            } catch (e) {
					                console.log(e);
					                console.log("Not updating store - Projects not loaded yet");
					            }
							   }

							   }
							  >
				 		{addComments => <button onClick={addComments}> submit </button>} 

					</Mutation>
				</div>
			</div>
		)		
	}
}

export default Publish;