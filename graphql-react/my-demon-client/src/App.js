import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';
import { EMAIL,PASSWORD } from './constants';
import {Link} from 'react-router-dom';
import ShowPost from './Component/ShowPost';
import Header from './Component/Header';
import { Button } from 'reactstrap';


class App extends Component {


  	render() {
          const email  = localStorage.getItem(EMAIL);

      return(

             <div>
               <div> <Header email = {email} history = {this.props.history} /> </div>
             <Link to="/publish">
                 <img class = "publish" src="https://www.colourbox.com/preview/8278850-publish-stamp.jpg" height="70"/>
              </Link>
              <ShowPost />
              </div>
        )
  }
}

export default App;
