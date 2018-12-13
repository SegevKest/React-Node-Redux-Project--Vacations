import React, { Component } from 'react';
import {Col,Button, Input,InputGroupAddon, FormFeedback,InputGroup,Jumbotron} from 'reactstrap';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { logIn, logOut } from '../redux/actions';

// import {socket } from 'socket.io';

import './Login.css';

var that;
class Login extends Component {

    currentUser={ 
        firstName:"",
        lastName:"",
        id:"",
        followedVacations:[],
        isAdmin:false
    };

    constructor(props)
    {
        super(props);
        this.state={username:"",password:"",
                    sumbitted:false, msg:"",logged:false, adminLog:false};        
        
        this.getChangedValue=this.getChangedValue.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.checkAndLogin=this.checkAndLogin.bind(this);
        this.props.logOut();
        that=this;
    }

// // IN build- we will use this function to redirect
//     componentWillMount(){
//         fetch('http://localhost:3000/',{method:"GET"})
//         .then(resp=>resp.json()).then(answer=>{
//             if(answer != 0){
//                 if(answer.isAdmin)
//                     that.setState({...that.state, adminLog:true});
//                 else
//                     that.setState({...this.state, logged:true});
//             }
//         })
//     }

    getChangedValue(event){
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.setState(Object.assign({},this.state,{sumbitted:true}));
        let user={username:this.state.username, password:this.state.password};
        if (this.state.username !="" || this.state.password !="") {
            this.checkAndLogin();
        }
        else
            this.setState({...this.state, msg:"Empty Inputs"});
    }

    checkAndLogin(){
        //Check if exist Part
        let user={username:this.state.username, password:this.state.password};

        fetch('http://localhost:3000/checkexist',{
            method:'POST',
            headers:{ 'Accept': 'application/json',
                'Content-Type': 'application/json'},
            //Only For Practice, must be removed after NPM BUILD
            body:JSON.stringify({username:this.state.username})})
            .then(data=>data.json())
            .then(found =>{
                if(found != {})
                    this.login(user);
                else
                    this.setState({...this.state, msg : "Missing Password or Username" });
            }).catch(err=>err);
}

login(userObj){//Log in part

     fetch('http://localhost:3000/login',{
        method:'POST',
        headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'},
        body:JSON.stringify(userObj)})
        .then(data=> data.json()).then( user=>{
                this.currentUser.firstName=user.firstName;
                this.currentUser.lastName=user.lastName;
                this.currentUser.isAdmin=user.isAdmin;
                this.currentUser.id=user.id;
            //Handeled when loggedin
            this.props.logIn(this.currentUser);
            this.setState({...this.state, logged:true});
        }).catch(err=>{
            const newState={...this.state, msg:"Wrong Username Or missing Info",logged:false};
            this.setState(newState);
        });
}

  render() {
      
    return (
        <div>
            {/* {this.state.adminLog && <Redirect to='/admin'/>}
            {this.state.logged && <Redirect to='/vacations'/>} */}
            {this.state.logged ? 
                (this.props.currentUser.isAdmin ? <Redirect to='/admin'/> :< Redirect to='/vacations'/>) :null }
            <Col sm="12" md={{ size: 6, offset: 3 }} >
            <Jumbotron>
                <h1 className="text-center">Log In</h1>
                <form>
                    <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Username </InputGroupAddon>
                        <Input invalid={this.state.msg != ""} type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.getChangedValue} />
                        <FormFeedback tooltip>{this.state.msg}</FormFeedback>
                    </InputGroup>
                    <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Password </InputGroupAddon>
                        <Input required type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.getChangedValue}/>
                    </InputGroup>
                    <br/>
                    <Button type="button" color="primary" className="float-right" onClick={this.handleSubmit}>Log In</Button>
                    <Link to="/register" className="btn btn-link">  Not a Member ?</Link>
                </form>
            </Jumbotron>
        </Col>
    </div>
    );
  }
}


const mapStateToProps= state =>{
    return  { 
        currentUser:state.currentUser
    };
}

const mapDispatchToProps= dispatch =>{
    const logActions={
        logIn:userObj=>dispatch(logIn(userObj)),
        logOut:()=>dispatch(logOut())
    }
    return logActions;
}

const login=connect(mapStateToProps , mapDispatchToProps)(Login);

export default login;
