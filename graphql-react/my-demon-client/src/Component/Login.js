import React, {Component} from 'react';
import { EMAIL,PASSWORD } from '../constants'
import gql from 'graphql-tag';
import {Mutation, Query	} from 'react-apollo';
import LOGIN_OUT from '../Graphql_command/Login_out';
import {InputGroup,InputGroupAddon,Input,InputGroupText,Button,Breadcrumb,BreadcrumbItem} from 'reactstrap';

const SIGNUP=gql`
	mutation Signup($name : String!, $email : String!, $password : String!){
		createUser(name: $name, email : $email, password : $password){
			name
			email
			id
		}
	}

`;




class Login extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    name: '',
    submit:false,
  }

  render() {
    const { login, email, password, name } = this.state
    const status=true;
    return (

      <div>
        <Breadcrumb>
          <BreadcrumbItem active>{login ? 'Login' : 'Sign Up'}</BreadcrumbItem>
        </Breadcrumb>

        <div>
          {!login && (
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Name:</InputGroupText>
              </InputGroupAddon>
            <Input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
            </InputGroup>
          )}
          <br/>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Email:</InputGroupText>
            </InputGroupAddon>
          <Input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />

          </InputGroup>
          <br/>
          <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Password:</InputGroupText>
          </InputGroupAddon>

          <Input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
          </InputGroup>
          <br/>
        </div>
        <div >
            <Mutation mutation={ login ? LOGIN_OUT: SIGNUP}
       				variables={ {email,name,password,status }}
       				onCompleted = {data => this._confirm(data)}
			>
                {mutation => (
                    <div >
                      <Button onClick = {mutation} color={login?"secondary":"secondary"}>{login ? 'login' : 'create account'}</Button>
                    </div>
                )}
            </Mutation>
            <br/>
            <div

        	>
           		<Button onClick={() => this.setState({ login: !login })}
                        color={login? "secondary":"secondary"}>{login
            		? 'need to create an account?'
                  : 'already have an account?'}</Button>
         	</div>
        </div>
      </div>
    )
  }

  _confirm = data => {

    if(!this.state.login) {
    	const email = data.createUser.email;

    	const password = data.createUser.password;

    	this._saveUserData(email,password);
    }
    else if(data.userLogin.count>0){

    	 const email=this.state.email;
    	 const password =this.state.password;
    	 this._saveUserData(email,password);
    }
    else {
    	alert("wrong email or password!");
    }

  }

  _saveUserData = (email,password) => {
    localStorage.setItem(EMAIL, email);
    localStorage.setItem(PASSWORD,password);
    this.props.history.push(`/`)
  }
}

export default Login;
