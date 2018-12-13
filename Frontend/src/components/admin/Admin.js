import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import VacationRow from "./VacationRow";
import Header from "../Header";
import AddModal from "./AddModal";
import { setVacations } from "../../redux/actions";
import { Redirect } from 'react-router-dom';
import openSocket from 'socket.io-client';
import history from '../common/Main';
const socket= openSocket('http://localhost:3008');



var that;
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, toStats:false ,logged:true};
    this.toggle = this.toggle.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.getVacations= this.getVacations.bind(this);
    that=this;
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    this.getVacations();
    socket.on('UPDATE_VACATIONS', ()=>{ 
      this.getVacations()});
  }
  
  getVacations() {
    if (this.props.currentUser.firstName != "") {
      fetch("http://localhost:3000/admin", {
        method: "GET"
      }).then(response => response.json()).then(data => {
          //The array of all the vactions
          this.props.setVacations(this.setVacationsDates(data));
          }).catch(err => err);
    }
  }

  // Delete and Update pass to every row. after clicking the icons,
  // will render the all vacations
  delete(specVacationID) {
    fetch(`http://localhost:3000/admin/${specVacationID}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(data => {
        //When deleting vacation from admin
        //Socket in the Server Side
        if(window.confirm("Are you sure you want to Delete this Vacation ?")){
          this.getVacations();
      }
      })
      .catch(err => err);
  }

  update(specVacationID,newVacObj) {
    fetch(`http://localhost:3000/admin/${specVacationID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"},
        body:JSON.stringify(newVacObj)
    }).then(data => {
        //When updating vacation from admin
        //add socket.io
        this.getVacations();
      })
      .catch(err => err);
  }

  drawControllTable(vacations) {
      if ( vacations.length != 0) {
        return vacations.map((vacation,key)=> (
            <VacationRow vacation={vacation} index={key} key={key}
            delete={this.delete} update={this.update}
            onClick={this.getVacation}/>)
    )}
  }

  setLogged(){
    // the header COmponent will change this.logged and redirect to login
    fetch('http://localhost:3000/logout',{method: "GET" })
    .then(response => response.json()).then(data=>{
        this.setState({...this.state, logged:false});
    }).catch(err=>err);
    // this.props.history.push("/login");
  }
  
  setVacationsDates(vacationArr){
    for(let i=0; i<vacationArr.length;i++)
    {
      vacationArr[i].startDate=this.cutDateInfo(vacationArr[i].startDate);
      vacationArr[i].endDate=this.cutDateInfo(vacationArr[i].endDate);
    }
    return vacationArr;
  }
  cutDateInfo(date){  //return 10 first digits
    if(date.length > 10)
      return date.substring(0,10); 
    else 
      return date; 
  }
  moveToStats(){
    this.setState({...this.state, toStats:true});
  }

  render() {
    // The admin page will include a table of vacations, each row represent vacation
    // with buttons to edit and remove
    return (
      <div className="table-responsive">
        { this.state.toStats && <Redirect to='/admin/statistic' />}
        {!this.state.logged && <Redirect to='/login'/>}
        <Header currentUser={this.props.currentUser} toggle={this.toggle}
         loggingOut={this.setLogged.bind(this)} stats={this.moveToStats.bind(this)}/>
        <br />
        <Table className="table table-dark table-striped ">
          <thead>
            <tr>
              <th>#</th>
              <th>Destination</th>
              <th>Description</th>
              <th className="imgUrl">Image Url</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Cost</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {
            this.drawControllTable(this.props.allVacations)
            }
          </tbody>
        </Table>
        {/* <AddModal modal={this.state.modal} toggle={this.toggle} syncVacations={this.getVacations}/> */}
        <AddModal modal={this.state.modal} toggle={this.toggle} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { allVacations: state.allVacations, currentUser: state.currentUser };
};
const mapDispatchToProps = dispatch => {
  const getVacationsAction = {
    setVacations: vacation => dispatch(setVacations(vacation))
  };
  return getVacationsAction;
};

const admin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);

export default admin;
