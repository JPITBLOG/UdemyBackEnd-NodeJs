import React, {Component} from 'react';
import './CourseInDetail.css';
import '../../../node_modules/video-react/dist/video-react.css';
import {Button, Collapse, FormGroup} from 'reactstrap';
import {connect} from 'react-redux';
import AddToCart from '../courses/addToCart';
import {withRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Login from "../header/loginModel";
import Register from "../header/registerModel";
import {Player} from "video-react";
import AdminavBar from '../../admin/adminNavbar';

const history = createBrowserHistory();

class CourseInDetail extends Component {

    constructor(props) {
        super(props);
        this.cartflag = 0;
        this.state = {
            collapse: false,
            id: null,
            popoverOpen: false,
            modal: false,
            Registermodal: false,
            Loginmodal: false
        };
        this.addToCart = this.addToCart.bind(this);
        this.chkIncart = this.chkIncart.bind(this);
        this.goToCart = this.goToCart.bind(this);
        this.buyProduct = this.buyProduct.bind(this);
        this.LoginPopup = this.LoginPopup.bind(this);
        this.registrPopup = this.registrPopup.bind(this);
    }

    registrPopup() {
        this.setState(prevState => ({
            Registermodal: !prevState.Registermodal
        }));
    }

    LoginPopup() {
        this.setState(prevState => ({
            Loginmodal: !prevState.Loginmodal
        }));
    }

    goToCart(e) {
        e.preventDefault();
        this.props.history.push({pathname: '/cart/'})
    }

    buyProduct(courseData) {
        const isUserLoggedIn = this.props.userRegisterLog.userDetail !== null ? this.props.userRegisterLog.userDetail.token != null : false;
        if (!isUserLoggedIn) {
            this.setState(prevState => ({
                Loginmodal: !prevState.Loginmodal
            }));
        } else {
            this.props.history.push({pathname: '/cart/checkout/', state: courseData});
        }
    }

    addToCart() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            popoverOpen: false
        }));
    }

    onLink = () => {
        this.addToCart();
    };

    onAuthenticateLink = () => {
        this.registrPopup();
        this.LoginPopup();
    };

    toggle = (index) => {
        this.setState(state => ({id: index, collapse: !state.collapse}));
    };
    chkIncart = (courseData) => {
        const that = this;
        if (localStorage.getItem('addToCart') !== null) {
            let cartDataStorage = JSON.parse(localStorage.getItem('addToCart'));
            cartDataStorage.map(function (cartData, index) {
                if (cartData.course_Name == courseData.course_Name) {
                    that.cartflag = 1;
                }
            })
        }
    };

    render() {
        const that = this;
        let courseData = this.props.location.state;
        let divideforLoop = courseData.learn.length / 2;
        let divideinLoop = Math.round(divideforLoop);
        this.chkIncart(courseData);
        let learnDataArranged = [];
        let courseContentStore = [];
        let requirementStore = [];
        let learnCount = 0;

        let price = parseInt(courseData.price);
        let offer = parseInt(courseData.offer);
        let discount = parseInt(price - ((price * offer) / 100));

        for (let i = 0; i < divideinLoop; i++) {
            learnDataArranged.push(
                <div className="row">
                    <div className="col-md-5">{courseData.learn[learnCount]}</div>
                    {courseData.learn[learnCount + 1] !== null ?
                        <div className="col-md-5">{courseData.learn[learnCount + 1]}</div>
                        : null
                    }
                </div>
            );
            learnCount += 2
        }

        courseData.course_content.map(function (courseContent, index) {
            courseContentStore.push(<div className="coursecontent-wrap" onClick={() => that.toggle(index)}>
                    {courseContent.content_Name}</div>,
                <Collapse isOpen={index == that.state.id ? that.state.collapse : false}>
                    {courseContent.sub_Content.map(function (contentData, index) {
                        return (<div className="course-title">{contentData}</div>)
                    })
                    }
                </Collapse>
            )
        });

        courseData.requirement.map(function (requirement, index) {
            requirementStore.push(<li>{requirement}</li>)
        });

        const isAdminLoggedIn = this.props.userRegisterLog.userDetail !== null ? this.props.userRegisterLog.userDetail.role == '1' : false

        return (
            <div>
                {isAdminLoggedIn?(<AdminavBar/>):null}
                <div className="HeaderComponent">
                    <div className="carousel-fullscreen-sidebar">
                        <div className="streamer__content">
                            <h3>{courseData.course_Name}</h3>
                            <p>
                                {courseData.course_Subtitle}
                            </p>
                            <div>
                                {"Created by " + courseData.created_By.join()}
                            </div>
                            <div>
                                {"Language : " + courseData.language}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="learnbox-wrap container">
                                <div className="learnBox">
                                    <div><h5>What you'll learn</h5></div>
                                    {learnDataArranged}
                                </div>

                                <div className="course-info">
                                    <div>
                                        <h5>Course Content</h5>
                                        {courseContentStore}
                                    </div>
                                </div>
                                <div className="course-requirement"><h4>Requirements</h4>
                                    <ul>
                                        {requirementStore}
                                    </ul>
                                </div>
                                <div className="course-description">
                                    <h4>Description</h4>
                                    <div>{courseData.description}</div>
                                </div>
                            </div>
                        </div>

                            <div className="col-md-4">
                                <Player playsInline src={courseData.course_Img}/>
                                <div>Total:</div>
                                <div><h2>{discount}</h2></div>
                                <p><strike>{price}</strike></p>
                                {isAdminLoggedIn ? null : (
                                    this.cartflag == 1 ?
                                    (<Button className="checkoutbtn" outline color="secondary"
                                            onClick={(e) => this.goToCart(e)}>Go to cart</Button>)
                                    :
                                    (<Button className="checkoutbtn btn-primary" onClick={this.addToCart}>Add to
                                        cart</Button>)

                                ,<Button className="checkoutbtn" outline color="secondary" onClick={() => this.buyProduct([{
                                    "course_Name": courseData.course_Name,
                                    "course_Img": courseData.course_Img,
                                    "created_By": courseData.created_By.join(),
                                    "price": price,
                                    "discount": discount,
                                    "category_Name": courseData.category_Name
                                }])}>Buy now</Button>
                                    )}
                            </div>

                    </div>
                </div>
                <AddToCart isOpen={this.state.modal} toggle={this.addToCart} className={this.props.className}
                           onlinkclick={this.onLink.bind(this)} data={this.state.modal ? {
                    "course_Name": courseData.course_Name,
                    "course_Img": courseData.course_Img,
                    "created_By": courseData.created_By.join(),
                    "price": price,
                    "discount": discount,
                    "category_Name": courseData.category_Name
                } : null}/>
                <Register isOpen={this.state.Registermodal} toggle={this.registrPopup} className={this.props.className}
                          onlinkclick={this.onAuthenticateLink.bind(this)}/>
                <Login isOpen={this.state.Loginmodal} toggle={this.LoginPopup} className={this.props.className}
                       onlinkclick={this.onAuthenticateLink.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {userRegisterLog} = state;
    return {
        userRegisterLog: userRegisterLog
    }
};

export default withRouter(connect(mapStateToProps, null)(CourseInDetail));
