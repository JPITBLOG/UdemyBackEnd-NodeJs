import React,{Component} from 'react';
import './Checkout.css';
import {Media} from "reactstrap";
import App from '../../payment/CardForm';

class Checkoutpag extends Component {
    constructor(props) {
        super(props);
        this.cartDataMap = [];
        this.getAllCheckoutData = this.getAllCheckoutData.bind(this);
        this.totalPrice = 0;
    }

    courseName = (course_Name) => {
        if (course_Name.length < 24)
            return course_Name;
        else
            return course_Name.substring(0, 24) + "..";
    };

    getAllCheckoutData = () => {
        this.totalPrice = 0;
        this.cartDataMap = [];
        const that = this;
        let CardData = this.props.location.state;
        try {
            CardData.map(function (Cart, index) {
                that.cartDataMap.push(
                    <Media className="checkout-wrap" key={index}>
                        <Media left>
                            <Media object src={Cart.course_Img} height="35px" width="35px"/>
                        </Media>
                        <Media body>
                            <Media heading>
                                <div className='checkout-wrap course-wrap'>
                                    <div className='d-flex flex-column w-75'>
                                        <p>{that.courseName(Cart.course_Name)}</p>
                                        <p className="instructorName">{Cart.created_By}</p>
                                        <div className='d-inline-flex'>
                                            <p>{Cart.discount}</p>
                                            <p><strike>{Cart.price}</strike></p>
                                        </div>
                                    </div>
                                </div>
                            </Media>
                            <div>

                            </div>
                        </Media>
                    </Media>
                )
                that.totalPrice += Cart.discount;
            })
        }
        catch (e) {
            that.cartDataMap.push(<div>There is no any data available</div>);
        }

    }

    render(){
        this.getAllCheckoutData();
        return(
            <div className="main-checkout-wrap">
                <div><h5>Your Items({this.cartDataMap.length})</h5></div>
                <div className="checkout-data">
                    {this.cartDataMap}
                </div>
                <div>
                    <App totalPrice = {this.totalPrice}/>
                </div>
            </div>
        );
    }
}

export default Checkoutpag;
