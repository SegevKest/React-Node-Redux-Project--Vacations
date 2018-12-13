import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Vacation from './common/Vacation';
import { setVacations, followVacation, unfollowVacation } from '../redux/actions';
import openSocket from 'socket.io-client';



var that;
class Vacations extends Component {

  constructor(props){
    super(props);
    this.state={
      followed:[],
      unfollowed:[],
    }
    that=this;
  }

   componentDidMount(){ //Load vacations and sort them
    this.getVacations();
    this.socket= openSocket('http://localhost:3008');
    this.socket.on('UPDATE_VACATIONS',()=>{ 
      this.setState({...this.state,followed:[],unfollowed:[]});
      this.getVacations()});
  }

//functions to sort the vacations array
  getVacations(){
    const userId=this.props.currentUser.id;
    if (userId) {
    fetch('http://localhost:3000/vacations',{
      method:'POST',
      headers:{   'Accept': 'application/json',
                  'Content-Type': 'application/json'},
      body:JSON.stringify({userid:userId})
    }).then(response=>response.json())
      .then(data=>{
          //The array of all the vactions
          this.finishLoading(data);    
        }).catch(err=>err);
  }
}

cutDateInfo(date){  //return 10 first digits
  if(date.length > 10)
    return date.substring(0,10); 
  else 
    return date; 
}

finishLoading(vacationArr){
  fetch('http://localhost:3000/vacations/allfollowers',{method:'GET'})  // Array of all followed vacations
  .then(response=>response.json()).then(followedArr=>{
    followedArr.forEach(followedObj=>{
      for(let i=0; i<vacationArr.length;i++)
      {
        if(followedObj.vacationid === vacationArr[i].id){
          vacationArr[i].following=followedObj.followers;}
      }
    })
    this.sortVacations(vacationArr);
    this.props.setVacations(vacationArr); 
  }).catch(err=>err);

}

sortVacations(vacationArr){
    let newState  = {...this.state};
    for(let i=0;i<vacationArr.length;i++)
    {
      vacationArr[i].startDate=that.cutDateInfo(vacationArr[i].startDate); 
      vacationArr[i].endDate=that.cutDateInfo(vacationArr[i].endDate);              
      if(vacationArr[i].follows === 1) 
        newState.followed.push(vacationArr[i]);
      else
        newState.unfollowed.push(vacationArr[i]);
    }
  }

  setLogged(){
    // the header COmponent will change this.logged and redirect to login
    fetch('http://localhost:3000/logout',{method: "GET" })
    .then(response => response.json()).then(data=>{
        let stateCopy={...this.state, data};
        this.setState(stateCopy);
    }).catch(err=>err);
    this.props.history.push("/login");
  }

  render() {
    return (
      <div >
        <Header currentUser={this.props.currentUser}  loggingOut={this.setLogged.bind(this)}/>
          {/* followed Vacations */}
          <div className="row">
          {
            this.state.followed.map((vacay,key)=>
            <Vacation vacation={vacay} key={key} isFollowed={true} followedArr={this.state.followed}/>
          )}
          </div>
          <br/>
          <div className="row">
          {/* Unfollowed Vacations */}
          { 
            this.state.unfollowed.map((vacay,key)=>
            <Vacation unvacation={vacay} key={key} isFollowed={false} followedArr={this.state.followed}/>
          )}
          </div>
      </div>
    );
  }
}


const mapStateToProps= state =>{

  return  { allVacations:state.allVacations,
            currentUser:state.currentUser };
}
const mapDispatchToProps= dispatch =>{
  const setVacationsAction={
    setVacations:(vacations)=> dispatch( setVacations(vacations) ),
    followVacation:(vacationID)=> dispatch (followVacation(vacationID)),
    unfollowVacation:(vacationID)=> dispatch (unfollowVacation(vacationID))
  }
  return setVacationsAction;
}
const vacations=connect(mapStateToProps,mapDispatchToProps)(Vacations);

export default vacations;
