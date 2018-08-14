import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import QUERY_POST_TITLE from '../Graphql_command/Query_post_title';
import MUTATION_ADD_COMMENTS from '../Graphql_command/Mutation_add_comments';

 import { EMAIL,PASSWORD,USERID } from '../constants';
 

      		 
class AddComments extends Component{
	constructor(props){
		super(props);
		this.state={
			content:"",
			user_id:"",
		};
	}
	handleOnchange(event){

		event.preventDefault();
		this.setState({
			content:event.target.value,
		})
	}
	onChangeUserId(value){
		this.setState({
			user_id:value,
		})
	}

	render(){
		const userId = localStorage.getItem(USERID);
		const email  = localStorage.getItem(EMAIL);
  		if(email===null) return (<div>sorry login first</div>)
		return (
			
			<div>
				<p>add comments:</p>
				<div>
					 
					<input value = {this.state.content} onChange={ e => this.handleOnchange(e)}/>

					<Mutation mutation={MUTATION_ADD_COMMENTS} 
							  variables={{content: this.state.content, user_id:userId, post_id:this.props.post_id}}
							 	 
							  update = {(store,{data:{createComment}}) => {
							  	console.log(store.data.data);
							  	try {
					                const newData = store.readQuery({ query: QUERY_POST_TITLE,  variables:{searchString:this.props.params}});
					                
					               	newData.posts.map((post)=>{if(post.id===this.props.post_id) post.comments.push(createComment); });
					                store.writeQuery({ query: QUERY_POST_TITLE, variables: {searchString:this.props.params}, data: newData  });
					            } catch (e) {
					                console.log(e);
					                console.log("Not updating store - Projects not loaded yet");
					            }
							  }}
							  >
				 		{addComments => <button onClick={addComments}> submit </button>} 

					</Mutation>
				</div>
			</div>
		)		
	}
}

export default AddComments;