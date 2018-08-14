
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import PostsByTitle from './Component/PostsByTitle'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';
import Login from './Component/Login';
import ShowPost from './Component/ShowPost';
import Entry from './Component/Entry';
import Publish from './Component/Publish';
import SHOW_ALL_POSTS from './Graphql_command/SHOW_ALL_POSTS';
import 'bootstrap/dist/css/bootstrap.css';


const client = new ApolloClient({
        uri: "http://127.0.0.1:4000/",
        cache: new InMemoryCache(),
})
console.log(client);
ReactDOM.render( (
	<BrowserRouter>

    <ApolloProvider client = {client}>
    <Router basename="/">
   		 <Switch >
          <div>
          <Route path='/' exact component={Entry} />
          <Route path="/app" exact component={App}/>
          <Route path="/show_by_title/:tid" component={PostsByTitle}/>
          <Route path="/login" component = {Login} />
          <Route path="/publish" component = {Publish} />
          </div>
          </Switch>
    </Router>
     </ApolloProvider>
          </BrowserRouter>
  ),document.getElementById('root'));
registerServiceWorker();
