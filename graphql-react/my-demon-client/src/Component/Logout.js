import React, {Component} from 'react';
import { EMAIL,PASSWORD,USERID } from '../constants';
import LOGIN_OUT from '../Graphql_command/Login_out';
import {Mutation, Query } from 'react-apollo';
 const email  = localStorage.getItem(EMAIL);
 const password= localStorage.getItem(PASSWORD);
const status=false;

class Logout extends Component{
      
       redirect(){

            localStorage.removeItem(EMAIL);
            localStorage.removeItem(PASSWORD);
            localStorage.removeItem(USERID);
            this.props.history.push(`/login`);
      }
      render(){

      
      return (
      <Mutation mutation={  LOGIN_OUT}
              variables={ {email,password,status }}
              onCompleted = {()=>this.redirect()}
      > 
               {out => <div><button onClick={out}> logout </button></div>}
            </Mutation> 
             
    )
    }
}

export default Logout;