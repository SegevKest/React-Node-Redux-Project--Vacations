import React, { Component } from 'react';
import { Card, CardText, CardBody,
    CardHeader, CardSubtitle ,CardTitle,Badge,CardFooter } from 'reactstrap';
import FollowBtn from './FollowBtn';

class Vacation extends Component {

  constructor(props){
    super(props);
    this.state={followd:false};
    this.followClicked= this.followClicked.bind(this);
  }

  followClicked(){
    this.setState(  {followd: !this.state.followd}   );
  }

  // card of a vacation, will appear like this in user page only
  render() {
    const vac= this.props.vacation ;
    const unvac = this.props.unvacation;

    return (
      <div className="col-sm-4 mt-4">
      
        <Card id={vac && vac.id || unvac && unvac.id}>
            <CardHeader className="text-center">{vac && vac.destination}{unvac && unvac.destination} </CardHeader> 
            <img width="100%" height="80px" src={(vac && vac.img) || (unvac && unvac.img)} alt="Vacation " />
            <CardBody >
                <CardText><b>Dates :</b> {(vac && vac.startDate) || (unvac && unvac.startDate)}  <b>To</b>  {(vac && vac.endDate) || (unvac && unvac.endDate)}</CardText>
                <br/>
                <CardText>{(vac && vac.description )|| (unvac && unvac.description)}</CardText>
                <CardText><b>Cost:</b> ${vac && vac.cost || (unvac && unvac.cost)}</CardText>
                <h5 ><Badge style={{width:"80%"}} color="info" >Current Followers : {(vac && vac.following) || (unvac && unvac.following)}</Badge></h5>
            </CardBody>
            <CardFooter className="text-center"> 
              <FollowBtn followedArr={this.props.followedArr} 
                isFollowed={this.props.isFollowed ? true : false} />
            </CardFooter>
        </Card>
      </div>
    );
  }
}

export default Vacation;