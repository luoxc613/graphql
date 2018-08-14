import React, { Component } from 'react';
import { Query } from 'react-apollo';
import SHOW_ALL_POSTS from '../Graphql_command/SHOW_ALL_POSTS';
import App from '../App';
import { Table,Alert } from 'reactstrap';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
class ShowPost extends Component{

	render(){
		return(
				<div>
					<Link to={{pathname:'/'}}> <img src="https://cdn3.iconfinder.com/data/icons/line/36/arrow_left-512.png" height = "60"/> </Link>
					<Query query={SHOW_ALL_POSTS}>
						{({loading, error, data})=>{
					    if(loading) return <p>loading ... </p>
				        if(error) return <p>error</p>
				        console.log( data);
				    	return <div>
							<Table hover>
								<thread>
									<tr>
										<th>#</th>
										<th>Title</th>
										<th>Author</th>
									</tr>
								</thread>
                              	<tbody>
								{
									data===null ?
									  	<Alert color="danger">
                                      		There is no article published
                                    	</Alert>
									  : (data.posts.map((post,key)=>(

                                      <tr>
                                        <th>{key}</th>
                                        <th><Link to={{pathname:`/show_by_title/${post.id}`}}>{post.title}</Link></th>
                                        <th><Link to={{pathname:`/show_by_title/${post.author.id}`}} > {post.author.name} </Link> </th>
                                      </tr>

                                    )))
								}

								</tbody>
							</Table>
						</div>


    					}
    				}
					</Query>

				</div>

			)
	}
}

export default  ShowPost;
