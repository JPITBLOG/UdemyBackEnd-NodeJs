import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {createBrowserHistory} from 'history';
import {withRouter} from 'react-router-dom';
import * as userLog from '../../action/userRegisterLog';
import {connect} from 'react-redux';
import Facebook from './facebook';

import {Alert, Button,
    Form, FormGroup,
    Input, Modal, ModalBody,
    ModalFooter, ModalHeader,
    NavLink} from "reactstrap";
import * as addToCartAction from "../../action/addUserCartData";

const history = createBrowserHistory();

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            eml:null,
            pswd:null,
            errors:{},
            error_flag:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    async logindata(event){
        const that = this;
        let uniqueArray = null;
        event.preventDefault();
        if(this.handleValidation()){
            const answer = await (this.props.action.userdetail.getUserLogin(this.state.eml,this.state.pswd));
            if(!answer){
                this.setState({error_flag:true})
            }
            else{
                this.props.toggle();
                this.setState({error_flag:false});
                this.setState({
                    eml:null,
                    pswd:null,
                    errors : {},
                    error_flag:false
                });

                if(this.props.userCartItem.cartItem !== null && this.props.userCartItem.cartItem.length > 0){
                    that.props.userRegisterLog.userDetail.cartData.map(function (cart,index) {
                        uniqueArray = that.props.userCartItem.cartItem.filter(function (cartItem,index)  {
                            return cartItem.course_Name !== cart.course_Name;
                        })
                    })
                    console.log("unique value..........",uniqueArray);
                    let cartData = [...this.props.userRegisterLog.userDetail.cartData,...uniqueArray];
                    let u_id =  this.props.userRegisterLog.userDetail._id;
                    let passDataObject = {u_id,cartData}
                    let resp = await (this.props.action.addToCartDataAction.addCartData(passDataObject));
                    if(resp)
                        localStorage.removeItem("addToCart");
                        localStorage.removeItem("saveForCart");

                }

                if(this.props.userRegisterLog.userDetail.role == '1'){
                    this.props.history.push({pathname:'/adminpenal/'});
                }
            }
        }
    }

    handleValidation = () => {
        let emlFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let errors = {};
        let formIsValidate = true;
        let eml = this.state.eml;
        let pswd = this.state.pswd;

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

        this.setState({errors : errors});
        return formIsValidate;

    }

    handleChange = (e,stateKet) => {
        this.setState({[stateKet]:e.target.value})
    }

    render(){

        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader toggle={this.props.toggle}>Log In to Your Udemy Account!</ModalHeader>
                <ModalBody>
                    <Form>
                        {this.state.error_flag ? (<Alert color="danger">Enter valid data</Alert>): null}
                        <FormGroup>
                            <Facebook toggle = {this.props.toggle}/>
                        </FormGroup>
                        <FormGroup>
                            <Input onChange = {(event) => this.handleChange(event,'eml')} type="email" name="email" id="email" placeholder="Email"
                                   value = {this.state.eml || ''}/>
                            <span style={{color: "red"}}>{this.state.errors["eml"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Input onChange = {(event) => this.handleChange(event,'pswd')} type="password" name="password" id="Password"
                                   placeholder="Password" minLength="5" maxLength="12" value={this.state.pswd || ''}/>
                            <span style={{color: "red"}}>{this.state.errors["pswd"]}</span>
                        </FormGroup>
                        <Button className="btn-primary" onClick={this.logindata.bind(this)}>Log In</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <p>Don't have an account?</p>
                    <NavLink onClick={this.props.onlinkclick}>Sign up</NavLink>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    const {userRegisterLog,userCartItem} = state;
    return {
        userRegisterLog: userRegisterLog,
        userCartItem: userCartItem
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        userdetail: bindActionCreators(userLog, dispatch),
        addToCartDataAction: bindActionCreators(addToCartAction,dispatch)
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));
