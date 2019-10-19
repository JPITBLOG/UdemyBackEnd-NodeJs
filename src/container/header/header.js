import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userLog from '../../action/userRegisterLog';
import {withRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Register from './registerModel';
import Login from './loginModel';

import 'antd/dist/antd.css';
import {
    Collapse,
    DropdownToggle,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Alert,
    UncontrolledDropdown,
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    FormText,
    PopoverHeader,
    PopoverBody,UncontrolledPopover,DropdownMenu,DropdownItem
} from 'reactstrap';
import '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import logo from '../../Asset/logo-coral.svg';
import cartImg from '../../Asset/images (1).png';
import {Menu, Dropdown, Icon} from 'antd';
import './header.css';

const {SubMenu} = Menu;
const history = createBrowserHistory();

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            modal: false,
            Loginmodal: false,
            error: null,
            popoveronbtn1:false,
            popoveronbtn2:false
        };
        this.handleGenreSelect = this.handleGenreSelect.bind(this);
        this.registrPopup = this.registrPopup.bind(this);
        this.LoginPopup = this.LoginPopup.bind(this);
    }

    onEnter = (event) => {
        if(event.target.id == "pop1")
            this.setState({popoveronbtn1: true})
        else
            this.setState({popoveronbtn2:true})
    }

    onOut = (event) => {
        if(event.target.id == "pop1")
            this.setState({popoveronbtn1: false})
        else
            this.setState({popoveronbtn2:false})
    }


    registrPopup() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    LoginPopup(){
        this.setState(prevState => ({
            Loginmodal: !prevState.Loginmodal
        }));
    }
    onLink(){
        this.registrPopup(); this.LoginPopup();
    }

    logoutUser = (e) => {
        e.preventDefault();
        this.props.action.userdetail.getUserLogout();
        this.props.history.push({pathname: '/'})
    }

    OpenPenal = (e) => {
        e.preventDefault();
        this.props.history.push({pathname:'/adminpenal/'});
    }

    handleGenreSelect = (e,getarray) => {
                localStorage.removeItem("topic");
                localStorage.removeItem("subcategory");

                let topicStorage = [];
                let path = getarray[0];
                path = path.toLowerCase();
                path = path.replace(" ","-");
                this.props.history.push({pathname:'/'+getarray[1]+'/',state:getarray[0]});
    };

    appendNotification = () => {
        let data = [];
        if(this.props.userRegisterLog.userDetail !== null && this.props.userRegisterLog.userDetail.cartData.length > 0){
            return this.props.userRegisterLog.userDetail.cartData.length;
        }
        else if(this.props.userCartItem.cartItem !== null && this.props.userCartItem.cartItem.length > 0){
            return this.props.userCartItem.cartItem.length;
        }
        return null;
    }

    appendcategory = (categories) => {
        let that = this;
        try {
            return categories.map(function (element,key) {
                return (
                    element.subcategory && element.subcategory.length ?
                        <SubMenu item = {["courses",element.name]} title={element.name} onTitleClick={(event) => that.handleGenreSelect(event,[element.name,"courses"])} key={element.name}>
                            {that.appendcategory(element.subcategory)}
                        </SubMenu>
                        :
                        (<Menu.Item key={element.name} item = {["topic",element.name]} onClick={(event) => that.handleGenreSelect(event,[element.name,"topic"])}>{element.name}</Menu.Item>)
                )
            });
        }
        catch (e) {
            console.log("there is an error like: ",e);
        }
    };

    render() {
        const menu = (<Menu>
                        {this.appendcategory(this.props.categorydetail.Allcategory)}
                    </Menu>);
        return (
                <div className="header-custom">

                        <Navbar color="light" light expand="md" className='w-100 navbar-main-wrap'>
                            <NavbarBrand href="/"><img src={logo} width="110" height="32"/></NavbarBrand>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav navbar className='align-items-center w-100'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <Dropdown overlay={menu}>
                                                <a className="ant-dropdown-link header-cat">
                                                    Categories <Icon type="down"/>
                                                </a>
                                            </Dropdown>
                                    </UncontrolledDropdown>
                                    <NavItem className='navitem-width'>
                                        <InputGroup className="d-flex input-wrap">
                                            <Input />
                                            <InputGroupAddon addonType="append">
                                                <Button color="white" href="#"><i className="fa fa-search"/></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>
                                            <Button id="PopoverClick" type="button">
                                                Udemy for Business
                                            </Button></NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>
                                            <Button id="PopoverLegacy" type="button">
                                            Teach on Udemy
                                        </Button></NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <a href="http://localhost:3001/cart/" className="notification"><img className="icon " alt="1" src={cartImg}/>
                                        <span className="badge">{this.appendNotification()}</span>
                                        </a>
                                    </NavItem>
                                    {this.props.userRegisterLog.userDetail == null ?(
                                        <>
                                        <NavItem>
                                            <NavLink className="cart"><Button className='btn-custom login mr-2 bg-white' onClick={this.LoginPopup}>log in</Button>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                        <NavLink className="cart"><Button className='btn-custom login border-0' onClick={this.registrPopup}>Sign Up</Button>
                                        </NavLink>
                                        </NavItem>
                                        </>
                                        ):
                                        <>
                                        <NavItem>
                                            <UncontrolledDropdown nav inNavbar>
                                                <DropdownToggle>
                                                    {this.props.userRegisterLog.userDetail.name.charAt(0).toUpperCase()}
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem onClick={this.logoutUser.bind(this)}>
                                                        Logout
                                                    </DropdownItem>
                                                    {this.props.userRegisterLog.userDetail.role == '1' ? (
                                                        <DropdownItem onClick={this.OpenPenal.bind(this)}>
                                                            AdminPenal
                                                        </DropdownItem>
                                                    ) : null}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </NavItem>
                                        </>
                                    }

                                </Nav>
                            </Collapse>
                        </Navbar>
                        <Register isOpen = {this.state.modal} toggle={this.registrPopup} className={this.props.className}
                            onlinkclick = {this.onLink.bind(this)} />

                        <Login isOpen={this.state.Loginmodal} toggle={this.LoginPopup} className={this.props.className}
                               onlinkclick = {this.onLink.bind(this)} />
                    <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                        <PopoverBody><span>Turn what you know into an opportunity<br />
                                                and reach millions around the world.</span>
                            <a tag={Link} href="https://www.udemy.com/teaching/?ref=teach_header">Learn more</a>
                        </PopoverBody>
                    </UncontrolledPopover>
                    <UncontrolledPopover trigger="click" placement="bottom" target="PopoverClick">
                        <PopoverBody><span>Get your team access to 3,500+ top<br />
                                            Udemy courses anytime, anywhere</span>
                            <a tag={Link} href="https://business.udemy.com/request-demo/?locale=en_US&ref=ufb_header">Try Udemy for Business</a>
                        </PopoverBody>
                    </UncontrolledPopover>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {categorydetail,userRegisterLog,userCartItem} = state;
    return {
        categorydetail: categorydetail,
        userRegisterLog: userRegisterLog,
        userCartItem: userCartItem
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        userdetail: bindActionCreators(userLog, dispatch)
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))

