import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../card-slider/cardSlider.css';
import {withRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import * as userCartItem from '../../action/userCartItem';
import * as addToCartAction from '../../action/addUserCartData';
import poster from '../../Asset/slider.png';

import {Alert, Button,
    Modal, ModalBody,
    ModalFooter, ModalHeader} from "reactstrap";
    const history = createBrowserHistory();
class AddToCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            storageflag : 1
        }
    }
    chkData = (objectData) => {
        const that = this;
        let getCartData = [];
        // getCartData = JSON.parse(localStorage.getItem("addToCart"));
        // getCartData.map(function (card,index){
        //     if(objectData.length >1){
        //         if(card.course_Name === objectData[1].course_Name){
        //             that.setState({storageflag:0});
        //             }
        //     }
        //     else{
        //         that.setState({storageflag:0});
        //     }
        //     return 0;
        // });
        return getCartData;
    }

    addToCartData = (Objectdata) => {
        const that = this;
        let getCartData;
        if(Objectdata.length >1){
            getCartData = this.chkData(Objectdata);
            if(that.state.storageflag === 1){
                getCartData.push(Objectdata[1]);
                localStorage.setItem("addToCart",JSON.stringify(getCartData));
                this.props.action.userCartItem.getCartItem(getCartData);
                that.setState({storageflag:0});
            }
        }
    }
    GoToCartData = () => {
        this.props.onlinkclick();
        this.props.history.push({pathname:'/cart/'});
    }

    postCartData = async (passDataObject) => {
        let resp = await (this.props.action.addToCartDataAction.addCartData(passDataObject));
        if(resp)
            return true;
        else
            return false;
    }

    render(){
        let that = this;
        let totalPrice = 0;
        let totaldiscountedPrice = 0;
        if(this.props.data !== null){
            let storageflag = 1;
            let cartStorage = [];
            let obj = [];
            let dataBindTocart = [];
            let availableCartData = null;
            obj.push(this.props.data);

            if(this.props.userRegisterLog.userDetail !== null){
                let u_id = this.props.userRegisterLog.userDetail._id;
                availableCartData = this.props.userRegisterLog.userDetail.cartData;
                console.log('available cart data : ',availableCartData);
                if(availableCartData.length == 0 || availableCartData[availableCartData.length - 1].course_Name !== this.props.data.course_Name){
                    let cartData = [...availableCartData,...obj];
                    let passDataObject = {u_id,cartData};
                    let resp = this.props.action.addToCartDataAction.addCartData(passDataObject);
                    if(resp)
                        return true;
                    else
                        return false;
                }
            }
            else {
                if(localStorage.getItem("addToCart") !== null){
                    cartStorage = JSON.parse(localStorage.getItem("addToCart"));
                    cartStorage.map(function (card,index){
                        if(card.course_Name === that.props.data.course_Name){
                            storageflag = 0;
                        }
                        return 0;
                    })
                }
                if(storageflag === 1 || localStorage.getItem("addToCart") === null){
                    cartStorage.push(this.props.data);
                    localStorage.setItem("addToCart",JSON.stringify(cartStorage));
                    that.props.action.userCartItem.getCartItem(cartStorage);
                }
            }

            this.props.courses.AllCourses.map(function (course,index){
                if(course.category_Name == obj[0].category_Name && course.course_Name !== obj[0].course_Name && obj.length == 1){
                    let price = parseInt(course.price);
                    let offer = parseInt(course.offer);
                    let discount = parseInt(price - ((price * offer) / 100));
                    obj.push({"course_Name":course.course_Name,"course_Img":course.course_Img,"created_By":course.created_By.join(),
                        "price":price,"discount":discount,"category_Name":course.category_Name});
                }
                return 0;
            });

            obj.map(function (value,index){
                totalPrice += value.price;
                totaldiscountedPrice += value.discount;

                dataBindTocart.push(
                        <div className="card" id="card" style={that.props.cardStyle} key={value.course_Name}>
                            <div id="card">
                                <div className="card-wrap">
                                    <img src={poster} id="img" width="240" height="135"/>
                                    <p className="title">{value.course_Name}</p>
                                    <p className="desc">{value.created_By}</p>
                                    <p className="desc"><strike>{value.price}</strike></p>
                                    <p className="desc">{value.discount}</p>
                                    <p className="desc">{value.category_Name}</p>
                                </div>
                            </div>
                        </div>
                    );
            });

            if(this.state.storageflag == 1){
                this.chkData(obj);
            }
            return(
                <Modal isOpen={that.props.isOpen} toggle={that.props.toggle} className={that.props.className}>
                    <ModalHeader toggle={that.props.toggle}><Alert color="success">
                        Added{" "+obj[0].course_Name}
                        &nbsp;&nbsp;<Button><a href="http://localhost:3001/cart/">Go to Cart</a></Button></Alert></ModalHeader>
                    <ModalBody>
                        {dataBindTocart}<br/>
                        <div>{"Total: "+totaldiscountedPrice+" "}<strike>{totalPrice}</strike></div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.storageflag == 1 ?
                        <Button color="info" onClick={that.addToCartData.bind(that,obj)}>Add to Cart</Button>
                            :
                            <Button color="white" onClick={that.GoToCartData.bind(that,obj)}>Go to Cart</Button>}
                    </ModalFooter>
                </Modal>
            );
        }
        else {
            return null;
        }

    }
}

const mapStateToProps = (state) => {
    const { courses,userRegisterLog}  = state;
    return {
        courses : courses,
        userRegisterLog: userRegisterLog,

    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        userCartItem: bindActionCreators(userCartItem, dispatch),
        addToCartDataAction: bindActionCreators(addToCartAction,dispatch)
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddToCart));
