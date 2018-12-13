import React, { Component } from 'react';
import Switch from 'react-switch';
import { connect } from 'react-redux';
import { followVacation, unfollowVacation } from '../../redux/actions';


var that;
class FollowBtn extends Component {

    constructor(props){
        super(props);
        this.state = { checked: this.props.isFollowed }; // react switch
        this.addFollow=this.addFollow.bind(this);
        this.decFollow=this.decFollow.bind(this);
        this.handleChange = this.handleChange.bind(this);

        that=this;
    }

    handleChange(checked,e) { // react switch
        if(checked)
            that.addFollow(e);
        else
            that.decFollow(e);
        debugger;
        this.setState({ checked });
      }

    addFollow(e){
        const cardId=e.target.parentNode.parentNode.parentNode.id;
        const sendObj={ vacationid:cardId,
                        userid:this.props.currentUser.id };
        fetch('http://localhost:3000/vacations/addfollow',{
            method:'POST',
            headers:{   'Accept': 'application/json',
                        'Content-Type': 'application/json'},
            body:JSON.stringify(sendObj)
        }).then(data=>  {
            debugger;
            that.props.followVacation(sendObj.vacationid);
        }) 
        .catch(err=>err);
    }

    decFollow(e){
        const cardId=e.target.parentNode.parentNode.parentNode.id;
        const sendObj={ vacationid:cardId,
            userid:this.props.currentUser.id };
            debugger;
        fetch('http://localhost:3000/vacations/deletefollow',{
            method:'DELETE',
            headers:{   'Accept': 'application/json',
                        'Content-Type': 'application/json'},
            body:JSON.stringify(sendObj)
        }).then(data=> {
            that.props.unfollowVacation(sendObj.vacationid);
        })
        .catch(err=>err);
    }

    ifFollowe(){
        // function that will check if the current vacation is in the followed arr.
    }
    
  render() {
    return (
        <Switch
            onChange={this.handleChange}
            checked={this.state.checked}
            offColor={'#e6e6e6'}
            onColor={'#0086b3'}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow={'1px 1px 1px 1px'}
            activeBoxShadow={'0 0 2px 3px #3bf'}
            />
    );
  }
}

const mapStateToProps = state =>{
    return  { currentUser : state.currentUser }; 
}
const mapDispatchToProps = dispatch =>{
    const followingActions={
      followVacation:(vacationID)=> dispatch (followVacation(vacationID)),
      unfollowVacation:(vacationID)=> dispatch (unfollowVacation(vacationID))
    }
    return followingActions;
  }
const followBtn= connect(mapStateToProps, mapDispatchToProps)(FollowBtn);

export default followBtn;
