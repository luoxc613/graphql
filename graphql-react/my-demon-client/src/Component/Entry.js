import React, {Component} from 'react';
import { EMAIL,PASSWORD } from '../constants';
import {Link} from 'react-router-dom';
import GetUserId from '../Component/GetUserId';
import LOGIN_OUT from '../Graphql_command/Login_out';
import {Mutation, Query } from 'react-apollo';
import Logout from '../Component/Logout';
import './Entry.css';
import {Button,Breadcrumb, BreadcrumbItem,Card, CardTitle, CardText, CardImg, CardImgOverlay,Nav, NavItem, NavLink, Row, Col  } from 'reactstrap';
import Header from '../Component/Header';

class Entry extends Component{

  render() {
      const email  = localStorage.getItem(EMAIL);
      console.log(email);

    return (
      <div >
        <div><GetUserId /></div>
        <div><Header email={email} history={this.props.history}/></div>
        <div >
          <div>
            <Card inverse>
              <CardImg width="100%" height="10%" src="https://hankgarner.com/wp-content/uploads/2017/06/reading-books.jpg" />
              <CardImgOverlay>

              </CardImgOverlay>
            </Card>

          </div>

        </div>
        </div>


      )
    }
}

export default Entry;
