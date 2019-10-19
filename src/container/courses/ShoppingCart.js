import React, {Component} from 'react';
import {Media, Button} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {createBrowserHistory} from 'history';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as userCartItem from '../../action/userCartItem';
import './ShoppingCart.css';
import Login from "../header/loginModel";
import Register from "../header/registerModel";
import poster from '../../Asset/slider.png';

const history = createBrowserHistory();
class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            removeItm:null,
            saveItem:null,
            moveItem:null,
            modal: false,
            Loginmodal: false
        }
        this.LoginPopup = this.LoginPopup.bind(this);
    }

    deleteCourse = (courseName,CartLink) => {
        let filtred;
        let deleteCart;
        if(CartLink == "addToCart"){
            deleteCart = JSON.parse(localStorage.getItem('addToCart'));
            filtred = deleteCart.filter(function(cart,index){
                return cart.course_Name !== courseName;
            });
            localStorage.setItem("addToCart",JSON.stringify(filtred));
            this.props.action.userCartItem.getCartItem(filtred)
        }
        else{
            deleteCart = JSON.parse(localStorage.getItem('saveForCart'));
            filtred = deleteCart.filter(function(cart,index){
                return cart.course_Name !== courseName;
            });
            localStorage.setItem("saveForCart",JSON.stringify(filtred));
        }
    }

    removeCourse = (courseName,CartLink) => {
        this.deleteCourse(courseName,CartLink);
        this.setState({removeItm:courseName});
    }

    saveLaterCourse = (saveDataObject,CartLink) => {
        let saveCartData = [];
        this.deleteCourse(saveDataObject.course_Name,CartLink);
        if(localStorage.getItem('saveForCart') !== null){
            saveCartData = JSON.parse(localStorage.getItem('saveForCart'));
        }
        saveCartData.push(saveDataObject);
        localStorage.setItem('saveForCart',JSON.stringify(saveCartData));
        this.setState({saveItem:saveDataObject.course_Name});
    }

    moveToCart = (moveDataObject) => {
        let getCartData = [];
        let filtred;

        let deleteCart = JSON.parse(localStorage.getItem('saveForCart'));
        filtred = deleteCart.filter(function(cart,index){
            return cart.course_Name !== moveDataObject.course_Name;
        });
        localStorage.setItem("saveForCart",JSON.stringify(filtred));

        if(localStorage.getItem('addToCart') !== null){
            getCartData = JSON.parse(localStorage.getItem('addToCart'));
        }
        getCartData.push(moveDataObject);
        localStorage.setItem('addToCart',JSON.stringify(getCartData));
        this.props.action.userCartItem.getCartItem(getCartData)
        this.setState({moveItem:moveDataObject.course_Name});
    }

    mapped = (index,cartData,CartLink) => {
        const that = this;
        return(<Media className="main-wrap" key={index}>
            <Media left>
                <Media object src={poster} height="100px" width="100px"/>
            </Media>
            <Media body>
                <Media heading>
                    <div className='course-wrap'>
                        <div className='d-flex flex-column w-75'>
                            <p>{cartData.course_Name}</p>
                            <p className="instructorName">{cartData.created_By}</p>
                        </div>
                        <div className='d-flex flex-column remove-text'>
                            <p><a onClick={that.removeCourse.bind(this,cartData.course_Name,CartLink)}>{"Remove"}</a></p>
                            {CartLink == 'addToCart' ?
                                <p><a onClick={that.saveLaterCourse.bind(this, cartData,CartLink)}>Save for Later</a></p>
                                : <p><a onClick={that.moveToCart.bind(this, cartData)}>Move to Cart</a></p>
                            }
                        </div>
                        <div className='price-list'>
                            <p>{cartData.discount}</p>
                            <p><strike>{cartData.price}</strike></p>
                        </div>
                    </div>
                </Media>
                <div>

                </div>
            </Media>
        </Media>);
    }

    Checkout = (cartData) => {
        const isUserLoggedIn = this.props.userRegisterLog.userDetail !== null ? this.props.userRegisterLog.userDetail.token != null : false;
        if(!isUserLoggedIn){
            this.setState(prevState => ({
                Loginmodal: !prevState.Loginmodal
            }));
        }
        else {
            this.props.history.push({pathname:'/cart/checkout/',state:cartData});
        }
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

    render(){
        const that = this;
        let cartDataMap = [];
        let saveCartMap = [];
        let saveForlater = [];
        let saveCart = null;
        let cartData = null;
        let totalPrice = 0;
        let totalDiscount = 0;
        if (localStorage.getItem('addToCart') !== null) {
            let cartDataStorage = JSON.parse(localStorage.getItem('addToCart'));
            cartData = cartDataStorage.slice(0);
            cartData.map(function (cartData, index) {
                totalPrice += cartData.price;
                totalDiscount += cartData.discount;
                cartDataMap.push(
                    that.mapped(index,cartData,'addToCart')
                );
            });
        }

        if (localStorage.getItem('saveForCart') !== null) {
            let cartDataStorage = JSON.parse(localStorage.getItem('saveForCart'));
            saveCart = cartDataStorage.slice(0);
            saveCart.map(function (cartData, index) {
                saveCartMap.push(
                    that.mapped(index,cartData,'saveForCart')
                );
            });
        }

        return (
            <>
                <div className="header-Content">
                    <section className="style--jumbotron-header-bar--cart--3GsX0 jumbotron jumbotron-header-bar">
                        <div className="container">
                            <div className="jumbotron-header-bar__inner">
                                <div>
                                    <ol role="navigation" aria-label="breadcrumbs" className="breadcrumb">
                                        <li className=""><a href="/"><span className="udi udi-home">Home</span></a></li>
                                        <li className="active"><span>/&nbsp;Shopping Cart</span></li>
                                    </ol>
                                    <h1 data-purpose="shopping-cart-title">Shopping Cart</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="container">
                    <div className="row cart-wrap">
                        <div className="col-md-8"><div><h5>{cartDataMap.length > 0 ? cartDataMap.length+" Course in Cart" : null}</h5></div>
                        <div>
                            {cartDataMap.length > 0 ? cartDataMap :
                                <div><h2>There is no any course you selected</h2></div>}
                        </div>
                        </div>
                        <div className="col-md-4">
                            <div>Total:</div>
                            <div><h2>{totalDiscount}</h2></div>
                            <p><strike>{totalPrice}</strike></p>
                            {cartDataMap.length > 0 ?
                                <Button className="checkoutbtn btn-primary" onClick={this.Checkout.bind(this,cartData)}>Checkout</Button>
                                :
                                null
                            }

                        </div>
                    </div>
                    <div>Save for Later</div>
                    <div className="row cart-wrap">
                        {saveCartMap.length > 0 ? <> <div className="col-md-8">{saveCartMap}</div>
                            </> : null }
                    </div>
                </div>
                <Register isOpen = {this.state.modal} toggle={this.registrPopup} className={this.props.className}
                          onlinkclick = {this.onLink.bind(this)} />
                <Login isOpen={this.state.Loginmodal} toggle={this.LoginPopup} className={this.props.className}
                       onlinkclick = {this.onLink.bind(this)} />
            </>
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
        userCartItem: bindActionCreators(userCartItem, dispatch)
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ShoppingCart));
