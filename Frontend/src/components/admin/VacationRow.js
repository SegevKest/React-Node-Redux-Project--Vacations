import React, { Component } from 'react';
import  EditModal from './EditModal';
import './VacationRow.css';

class VacationRow extends Component {

  constructor(props){
      super(props);
      this.state = { modal: false };
      this.deleteVacation=this.deleteVacation.bind(this);
      this.updateVacation=this.updateVacation.bind(this);
      this.toggle = this.toggle.bind(this);
  }

  deleteVacation(){
    this.props.delete(this.props.vacation.id);
  }

  updateVacation(newVacationObj){
    this.setState({...this.state, modal:true});
    this.props.update(this.props.vacation.id, newVacationObj);
    this.toggle();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const vac=this.props.vacation;
    return (
      <tr>
        <th scope="row">{this.props.index+1}</th>
        <td>{vac.destination}</td>
        <td>{vac.description}</td>
        <td className="imgUrl">{vac.img}</td>
        <td>{vac.startDate}</td>
        <td>{vac.endDate}</td>
        <td>${vac.cost}</td> 
        <td>
          <i onClick={this.toggle} className='fas fa-pen-fancy' style={{fontSize:'24px',color:'red'}}></i> 
          <i onClick={this.deleteVacation} className='fas fa-trash-alt' style={{fontSize:'24px'}}></i>
        </td> 
        <EditModal edit={this.updateVacation} vacation={this.props.vacation} modal={this.state.modal} toggle={this.toggle} />
    </tr>
    );
  }
}

export default VacationRow;