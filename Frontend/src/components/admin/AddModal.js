import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button,
     Col, Row, Input,Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { addVacation } from '../../redux/actions';


class AddModal extends Component {

    constructor(props){
        super(props);
        this.state={ 
            destination:"", 
            description:"",
            startDate:"",
            endDate:"",
            cost:0,
            img:"",
            errorMsg:"",
            validForm:true
        }
        this.getChangedValue=this.getChangedValue.bind(this);
        this.addAVacation= this.addAVacation.bind(this);
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

    async addAVacation(){      
        await this.validateForm();
        let newState= {...this.state};
        delete newState.errorMsg;
        delete newState.validForm;
        if(this.state.validForm){
            await fetch('http://localhost:3000/admin',{
                method:'POST',
                headers:{   'Accept': 'application/json',
                            'Content-Type': 'application/json'},
                body:JSON.stringify(newState)
            }).then(data=>data.json()).then(added=>{                
                this.props.addVacation(added);
                this.props.toggle();
            }).catch(err=>err);
        }
            
}

    // the modal will open, form to add Vacation
  render() {
    return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
            <ModalHeader >Add Vacation</ModalHeader>
        <ModalBody>
        {   !this.state.validForm  ? 
                <Alert color="danger" id="error">
                <h4 className="alert-heading" >Not Valid</h4>
                {this.state.errorMsg}</Alert> 
        : null }
        
        <div className="container"> 
            {/* The Form to add Vacation */}
            <Row ><Col md={12}>
                <Input placeholder="Destination" onChange={this.getChangedValue} name="destination" required/>
                </Col></Row><br/>
                <Row><Col md={12}>
                <Input placeholder="Description" name="description" onChange={this.getChangedValue} required/>
                </Col></Row><br/>
            <Row >
            <Col md={6}>
                    From<Input placeholder="Start Date" type="date" name="startDate" onChange={this.getChangedValue} required/>
                </Col>
                <Col md={6}>
                    To<Input placeholder="End Date" type="date" name="endDate" onChange={this.getChangedValue} required/>
                </Col>
            </Row> <br/>
            <Row >
            <Col md={9}>
                    <Input placeholder="Cost" type="number" name="cost" onChange={this.getChangedValue} required/>
            </Col>
            </Row><br/>
            <Row ><Col md={12}>
                <Input placeholder="Img URL" type="text" name="img" onChange={this.getChangedValue}/>
            </Col></Row>
        </div>



        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addAVacation}>Add </Button>
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapDispatchToProps= dispatch =>{
    const addAction={
        addVacation:userObj=>dispatch(addVacation(userObj))
    }
    return addAction;
}

const addModal=connect(null , mapDispatchToProps)(AddModal);

export default addModal;