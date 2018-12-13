import React, { Component } from 'react';
import {Col,Button, FormFeedback, Input,InputGroupAddon, InputGroup,Jumbotron,ButtonGroup} from 'reactstrap';
import { BrowserRouter as Redirect, Link } from "react-router-dom";


class Register extends Component {

    constructor(props){
        super(props);
        this.state={username:"",
                    password:"",
                    firstName:"",
                    lastName:"",
                    msg:"",
                    registered:false,
                };
        this.getChangedValue=this.getChangedValue.bind(this);
        this.register=this.register.bind(this);
        this.validiateUsername=this.validiateUsername.bind(this);
    }

    getChangedValue(event){
        this.setState({[event.target.name]:event.target.value});
    }

    register(){
        fetch('http://localhost:3000/register',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body:JSON.stringify({...this.state})
        }).then(data=>data.json())
        .then(registered=>{
            console.log(registered);
            this.setState({...this.state, registered:true})    //When User registered
        }).catch(err=>err);
    }

    validiateUsername(){
        fetch('http://localhost:3000/checkexist',{
            method:'POST',
            headers:{ 'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body:JSON.stringify({username:this.state.username})})
            .then(data=>data.json()).then(found =>{
                if(Object.keys(found).length){
                    this.setState({...this.state, msg : "Taken Username"});
                }else
                    this.setState({...this.state, msg : ""});
            }).catch(err=>err);
    }

  render() {
    return (
        <Col sm="12" md={{ size: 6, offset: 3 }} >
        {   this.state.registered && <Redirect to="/login"/>}
            <Jumbotron>
                <h1 className="text-center">Register</h1>
                <br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">First Name </InputGroupAddon>
                    <Input type="text" name="firstName" value={this.state.firstName} placeholder="First Name" onChange={this.getChangedValue}/>
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Last Name </InputGroupAddon>
                    <Input type="text" name="lastName" value={this.state.lastName} placeholder="Last Name" onChange={this.getChangedValue}/>
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Username </InputGroupAddon>
                    <Input invalid={this.state.msg != ""}
                     type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.getChangedValue} onBlur={this.validiateUsername}/>
                    { this.state.msg !="" ? <FormFeedback tooltip>{this.state.msg}</FormFeedback> : null }
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Password </InputGroupAddon>
                    <Input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.getChangedValue}/>
                </InputGroup>
                <br/>
                    <Button color="primary" onClick={this.register} className="float-right" disabled={this.state.msg != ""}>Register</Button>
                    <Link to="/login"> Back </Link>
            </Jumbotron>
        </Col>
    );
  }
}

export default Register;
