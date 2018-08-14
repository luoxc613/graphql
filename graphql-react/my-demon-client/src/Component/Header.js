import React, {Component} from 'react';
import './Entry.css';
import {Button,Breadcrumb, BreadcrumbItem,Card, CardTitle, CardText, CardImg, CardImgOverlay,Nav, NavItem, NavLink, Row, Col  } from 'reactstrap';
import { EMAIL,PASSWORD } from '../constants';
import {Link} from 'react-router-dom';
import GetUserId from '../Component/GetUserId';
import Logout from '../Component/Logout';

const Header = (props) => {
  console.log(props);
  return (
    <div className="header">
    <Row>
      <Col xs="6" sm="5">
        <div>
          <Nav class="link">
            <NavItem>
              <NavLink href="/"> Index </NavLink>
            </NavItem>
            {props.email !== null && (
              <NavItem>
                <NavLink href="/app"> Article </NavLink>
              </NavItem>)
            }
          </Nav>
        </div>
      </Col>
      <Col xs="6" sm="3">
        <p> Article Show</p>
      </Col>
      <Col xs="6" sm="4">
        <div className="button">
          {props.email != null ? (
            <Logout history={ props.history}/>

          ) : (
            <Link to="/login">
              <button  >login</button>
            </Link>
          )}
        </div>
      </Col>
    </Row>
  </div>)
}

export default Header;
