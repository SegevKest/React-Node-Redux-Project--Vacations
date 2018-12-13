import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button,
     Col, Row, Input,Alert } from 'reactstrap';

class EditModal extends Component {

    // the modal will open, form to Edit the specific Vacation
    constructor(props){
        super(props);
        this.state={ 
            destination:"", 
            description:"",
            startDate:"",
            endDate:"",
            cost:0,
            img:"",
            validForm:true,
            errorMsg:""
        }
        this.getChangedValue=this.getChangedValue.bind(this);
        this.sendNewVacation= this.sendNewVacation.bind(this);
    }

    componentDidMount(){
        this.setState(this.props.vacation);
    }

    getChangedValue(event){
        this.setState({[event.target.name]:event.target.value});
    }

    validateForm(){
        let errors=[];
        if(this.state.description === "" || typeof this.state.description === "undefined")
            errors.push(`Missing Description`);
        if(this.state.destination === "" || typeof this.state.destination === "undefined")
            errors.push(`Missing Destination`);
        if(this.state.startDate === "" || typeof this.state.startDate === "undefined")
            errors.push(`Missing Start Date`);
        if(this.state.endDate === "" || typeof this.state.endDate === "undefined")
            errors.push(`Missing End Date`);
        if(this.state.cost === 0 || this.state.cost.length>9)
            errors.push(`Invalid Cost`);
        
            if(errors.length > 0){
                this.setState({...this.state, validForm:false, errorMsg:errors.join(' , ')})            
            }
            else{
                this.setState({...this.state, validForm:true})  
            }
    }

    async sendNewVacation(){
        await this.validateForm();
        let newState= {...this.state};
        delete newState.validForm;
        delete newState.errorMsg;
        if(this.state.validForm)
            await this.props.edit(newState);
    }
    
    cutDateInfo(date){  //return 10 first digits
        if(date.length>10)
          return date.substring(0,9); 
        else 
          return date ; 
      }

  render() {
      const vac=this.props.vacation;
    return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
            <ModalHeader >Edit Vacation</ModalHeader>
        <ModalBody>
        {   !this.state.validForm  ? 
                <Alert color="danger" id="error">
                <h4 className="alert-heading" >Not Valid</h4>
                {this.state.errorMsg}</Alert> 
        : null }

        <div className="container"> 
            {/* The Form to edit Vacation */}
            <Row ><Col md={12}>
                <Input placeholder="destination" value={this.state.destination} type="text" name="destination" onChange={this.getChangedValue} required/>
                </Col></Row><br/>
                <Row><Col md={12}>
                <Input placeholder="description" value={this.state.description} type="text" name="description" onChange={this.getChangedValue} required/>
                </Col></Row><br/>
            <Row >
            <Col md={6}>
                    From<Input placeholder="startDate" value={this.state.startDate} type="date" name="startDate" onChange={this.getChangedValue} required/>
                </Col>
                <Col md={6}>
                    To<Input placeholder="endDate" value={this.state.endDate} type="date" name="endDate" onChange={this.getChangedValue} required/>
                </Col>
            </Row> <br/>
            <Row >
            <Col md={9}>
                    <Input placeholder="Cost" value={this.state.cost} type="number" name="cost" onChange={this.getChangedValue} required/>
            </Col>
            </Row><br/>
            <Row ><Col md={12}>
                <Input placeholder="Image Url" value={this.state.img} type="text" name="img" onChange={this.getChangedValue} required/>
            </Col></Row>
        </div>

        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.sendNewVacation}>Update </Button>
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EditModal;