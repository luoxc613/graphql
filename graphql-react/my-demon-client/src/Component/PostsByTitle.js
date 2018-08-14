import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import QUERY_POST_TITLE from '../Graphql_command/Query_post_title';
import MUTATION_ADD_COMMENTS from '../Graphql_command/Mutation_add_comments';
import {Link} from "react-router-dom";
import AddComments from './AddComments'
import { EMAIL,PASSWORD,USERID } from '../constants';
import Header from  '../Component/Header';

class PostsByTitle extends Component{

	render(){
		const email  = localStorage.getItem(EMAIL);
  		if(email===null) return (<div>sorry login first</div>)
		return (
			<div>

				 <Link to={{pathname:'/app'}}> Back </Link>
				<Query query={QUERY_POST_TITLE} variables={ {searchString:this.props.match.params.tid}}>
					{({loading, error, data})=>{
					    if(loading) return <p>loading ... </p>
				        if(error) return <p>error</p>
				        console.log(data);
				    	return data.posts.map((post,index)=>(
				    		<div>
				    			<h>the  {index+1} article </h>
				    			<p>title:{post.title}   content:{post.content} author: {post.author.name}. </p>
				    			<div>
				    				comments:{post.comments.map((comment)=>(<div>{comment.content} by {comment.author.name}</div>))}
				    			</div>
				    			<div>
				    				<AddComments post_id={post.id} params={this.props.match.params.tid}/>
				    			</div>
				    		</div>
				    	))
    					}
    				}
				</Query>

			</div>
		)
	}
}

export default PostsByTitle;
