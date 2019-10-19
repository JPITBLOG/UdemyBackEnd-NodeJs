import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Col, Button, Form, FormGroup, Label, Input, FormText, Alert} from 'reactstrap';
import AdminavBar from './adminNavbar';
import * as addinstructorAction from "../action/addInstructor";
import * as instructorDetailAction from '../action/instructorDetail';

class AddInstructor extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:null,
            profession:null,
            selfDesc:null,
            errors : {},
            error_flag:false,
            Alert: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.addInstructor = this.addInstructor.bind(this);
    }

    commonvalidation = (inputparameter) => {
        if(inputparameter == null || inputparameter.length < 10){
            if(inputparameter == null){
                return("Cannot be empty");
            }
            else if(inputparameter.length < 10){
                return("required atleast 10 character");
            }
        }
        return true;
    }

    handleValidation = () => {
        let nameFormat = /[a-zA-Z][a-zA-Z ]*/;
        let errors = {};
        let commonresp;
        let formIsValidate = true;
        let name = this.state.name;
        let profession = this.state.profession;
        let description = this.state.selfDesc;

        //name
        if(name != null){
                if(!name.match(nameFormat)){
                    errors["name"] = "only letter is allowed";
                    formIsValidate = false;
                }
                else if(name.length < 3){
                    errors["name"] = "required atleast 3 character";
                    formIsValidate = false;
                }
        }
        else {
            errors["name"] = "Cannot be empty";
            formIsValidate = false;
        }

        //profession
        commonresp = this.commonvalidation(profession);
        if(commonresp != true){
            errors['profession'] = commonresp;
            formIsValidate = false;
        }

        //description
        commonresp = this.commonvalidation(description);
        if(commonresp != true){
            errors['selfDesc'] = commonresp;
            formIsValidate = false;
        }

        this.setState({errors : errors});
        return formIsValidate;
    }

     addInstructor = async(event) => {
            let pssParams;
            event.preventDefault();
            if(this.handleValidation()){
                let name = this.state.name;
                let profession = this.state.profession;
                let selfDescription = this.state.selfDesc;
                let courses = 0;
                pssParams = {name,profession,selfDescription,courses};
                const answer = await (this.props.action.addinstructor.addInstructor(pssParams));
                if(!answer){
                    this.setState({error_flag:true})
                }
                else{
                    await (this.props.action.instructorDetail.getAllInstructor());
                    this.setState({
                        Alert: 1,
                        name:null,
                        profession:null,
                        selfDesc:null,
                        errors : {},
                        error_flag:false
                    });
                }
            }
    }

    handleChange = (e,stateKey) => {
        this.setState({[stateKey]:e.target.value})
    }

    render() {
        return (
            <div>
                <AdminavBar/>
                {this.state.Alert == 1 ? (<Alert color="success">instructor added successfully!</Alert>) :
                    null }
            <Form>
                <FormGroup row>
                    <Label for="Name" sm={2}>Name</Label>
                    <Col sm={10}>
                        <Input type="text" name="name" id="Nam" onChange = {event => this.handleChange(event,"name")}
                                value = {this.state.name || ''}/>
                        <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="profession" sm={2}>Profession</Label>
                    <Col sm={10}>
                        <Input type="text" name="profession" id="profession" onChange = {event => this.handleChange(event,"profession")}
                               value = {this.state.profession || ''}/>
                        <span style={{color: "red"}}>{this.state.errors["profession"]}</span>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleSelect" sm={2}>Self-Description</Label>
                    <Col sm={10}>
                        <Input type="textarea" name="description" id="description" onChange = {event => this.handleChange(event,"selfDesc")}
                               value = {this.state.selfDesc || ''}/>
                        <span style={{color: "red"}}>{this.state.errors["selfDesc"]}</span>
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button onClick={(event) => this.addInstructor(event)}>Submit</Button>
                    </Col>
                </FormGroup>
            </Form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        addinstructor: bindActionCreators(addinstructorAction, dispatch),
        instructorDetail: bindActionCreators(instructorDetailAction, dispatch)
    }
});

export default connect(null,mapDispatchToProps)(AddInstructor);
