import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {createBrowserHistory} from 'history';
import {withRouter} from 'react-router-dom';
import * as userLog from '../../action/userRegisterLog';
import {connect} from 'react-redux';
import {Alert, Button,
    Form, FormGroup,
    Input, Label,
    Modal, ModalBody,
    ModalFooter, ModalHeader,
    NavLink} from "reactstrap";

const history = createBrowserHistory();

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            fname:null,
            eml:null,
            pswd:null,
            role:null,
            errors : {},
            error_flag:false
        }
        this.selectRole = this.selectRole.bind(this);
    }

    handleValidation = () => {
        let nameFormat = /^[A-Za-z]+$/;
        let emlFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let errors = {};
        let formIsValidate = true;
        let fname = this.state.fname;
        let eml = this.state.eml;
        let pswd = this.state.pswd;
        let role = this.state.role;

        if(fname == null ||fname > 0){
            if(fname == null){
                errors["fname"] = "Cannot be empty";
                formIsValidate = false;
            }
            else if(fname.length > 0){
                if(!fname.match(nameFormat)){
                    errors["fname"] = "only character is allowed";
                    formIsValidate = false;
                }
                else if(fname.length < 3){
                    errors["fname"] = "required atleast 3 character";
                    formIsValidate = false;
                }
            }
        }

        if(eml == null || eml.length > 0){
            if(eml == null){
                errors["eml"] = "Cannot be empty";
                formIsValidate = false;
            }
            else if(eml.length > 0){
                if(!eml.match(emlFormat)){
                    errors["eml"] = "required valid email";
                    formIsValidate = false;
                }
            }
        }

        if(pswd == null || pswd.length > 0){
            if(pswd == null){
                errors["pswd"] = "Cannot be empty";
                formIsValidate = false;
            }
            else if(pswd.length < 5){
                errors["pswd"] = "required atleast 5 character";
                formIsValidate = false;
            }
        }

        if (role == null) {
            errors["role"] = "Please Select Your role";
            formIsValidate = false;
        }


        this.setState({errors : errors});
        return formIsValidate;

    }

    async registerdata(event){
        let pssParams;
        event.preventDefault();
        if(this.handleValidation()){
            let fname = this.state.fname;
            let eml = this.state.eml;
            let pswd = this.state.pswd;
            let role = this.state.role;
            pssParams = {fname,eml,pswd,role};
            const answer = await (this.props.action.userdetail.getUserRegister(pssParams));
            if(!answer){
                this.setState({error_flag:true})
            }
            else{
                this.props.toggle();
                this.setState({error_flag:false});
                this.setState({
                    fname:null,
                    eml:null,
                    pswd:null,
                    role:null,
                    errors : {},
                    error_flag:false
                });
                if(this.props.userRegisterLog.userDetail.role == '1'){
                    this.props.history.push({pathname:'/adminpenal/'})
                }
            }
        }
    }

    handleChange = (e,stateKet) => {
        this.setState({[stateKet]:e.target.value})
    }
    selectRole = (e) => {
        console.log("select role::::::::::",e.target.value);
    }

    render(){
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader toggle={this.props.toggle}>Sign Up and Start Learning!</ModalHeader>
                <ModalBody>
                    <Form>
                        {this.state.error_flag ? (<Alert color="danger">Check your email & password.</Alert>): null}
                        <FormGroup>
                            <Input onChange = {event => this.handleChange(event,"fname")} type="text" name="fname" id="fnam" placeholder="Full Name" value = {this.state.fname || undefined}/>
                            <span style={{color: "red"}}>{this.state.errors["fname"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Input onChange = {event => this.handleChange(event,"eml")} type="email" name="email" id="email" placeholder="Email" value = {this.state.eml || undefined}/>
                            <span style={{color: "red"}}>{this.state.errors["eml"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Input onChange = {event => this.handleChange(event,"pswd")} type="password" name="password" id="Password" placeholder="Password" value = {this.state.pswd || undefined}/>
                            <span style={{color: "red"}}>{this.state.errors["pswd"]}</span>
                        </FormGroup>
                        <FormGroup check>
                            <Label for="examplePassword">Role :</Label><br/>
                            <Input type="radio" name="role" id="role" value="1" onChange={(event) => this.handleChange(event,"role")}
                                   checked = {this.state.role == "1"?true:false}/>Admin<br/>
                            <Input type="radio" name="role" id="role" value="0" onChange={(event) => this.handleChange(event,"role")}
                                   checked = {this.state.role == "0"?true:false}/>User <br/>
                            <span style={{color: "red"}}>{this.state.errors["role"]}</span>
                        </FormGroup>
                        <Button className="btn-primary" onClick={this.registerdata.bind(this)}>Sign Up</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <p>Already have an account?</p>
                    <NavLink onClick={this.props.onlinkclick}>Log In</NavLink>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    const {userRegisterLog} = state;
    return {
        userRegisterLog: userRegisterLog
    }
};


const mapDispatchToProps = dispatch => ({
    action: {
        userdetail: bindActionCreators(userLog, dispatch)
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Register));
