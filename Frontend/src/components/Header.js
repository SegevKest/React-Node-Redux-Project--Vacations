import React, { Component } from 'react';
import {Collapse ,Navbar ,NavbarToggler ,NavbarBrand ,Nav ,NavItem ,NavLink, Button} from 'reactstrap';
 import { connect } from 'react-redux';
import { logOut } from '../redux/actions';
import { Link } from "react-router-dom";

class Header extends Component {

  constructor(props){
    super(props);

    this.logout=this.logout.bind(this);
  }

  logout(){
    this.props.loggingOut(); // From Vacation Comp
    this.props.logOut();    // From Redux Actions
  }


  render() {
    return (
      <div>
        <Navbar color={this.props.currentUser.isAdmin ? "dark":"light"} light expand="sm">
         
          <NavbarBrand style={this.props.currentUser.isAdmin ? {color:"blue"} : {color:"black"}}> Vacations </NavbarBrand>
          <NavbarToggler /> 
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              <NavLink style={this.props.currentUser.isAdmin ? {color:"blue"} : {color:"black"}}>Hello {this.props.currentUser.firstName}</NavLink>
              </NavItem>
              <NavItem>
                <Button type="button" color="link" onClick={this.logout}>Log Out</Button>
              </NavItem>
              {
                  this.props.currentUser.isAdmin ?
                  <NavItem>
                    <Button color="link" onClick={this.props.toggle}>Add New Vacation</Button>  
                    <Button color="link" ><Link to="/admin/statistics" >To Stats</Link></Button>
                  </NavItem>
                  : null
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps= dispatch =>{
  const logOutAction={
      logOut:()=> dispatch( logOut() )
  }
  return logOutAction;
}

const header=connect(null , mapDispatchToProps)(Header);


export default header;
