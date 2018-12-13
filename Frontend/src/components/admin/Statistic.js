import React, { Component } from 'react';
import {Collapse ,Navbar ,NavbarToggler ,NavbarBrand ,Nav ,NavItem ,NavLink, Button} from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

var Chart=require('chart.js');

var that;
class Statistic extends Component {

    constructor(props){
        super(props);
        this.state= {followedVacations:[]};
        that=this;
    }

componentDidMount()
    {
        if(this.props.currentUser.isAdmin)
        {
        fetch('http://localhost:3000/admin/statistic',{
            method:"GET"}).then(data=>data.json())
            .then(followedArray=>{
                this.setState({...this.state, followedVacations:followedArray});
                debugger;

        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: that.state.followedVacations.map(vacay=>vacay.destination),
                datasets: [{
                    data: that.state.followedVacations.map(vacay=>vacay.followers),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend:false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    });
    }
}

 
  render() {
    return (
        <div>
            <div>
            <Navbar color={this.props.currentUser.isAdmin ? "dark":"light"} expand="sm">
                <NavbarBrand style={{color:"blue"}}> Vacations </NavbarBrand>
                <NavbarToggler /> 
                <Collapse navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    <NavLink style={{color:"blue"}}>Hello {this.props.currentUser.firstName}</NavLink>
                    </NavItem>
                    <NavItem>
                        <Button color="link"><Link to="/admin"> Back > </Link></Button>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
            </div>
            <div className="chart-container" style={{position: 'relative', height:'15vh', width:'40vw'}}>
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>
        </div>
    );
  }
}

const mapStateToProps= state =>{

    return  {  currentUser:state.currentUser };
  }

const statistic=connect(mapStateToProps)(Statistic);    


export default statistic;
