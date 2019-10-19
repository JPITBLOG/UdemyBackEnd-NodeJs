import React,{Component} from 'react';
import {Media} from "reactstrap";
import {createBrowserHistory} from 'history';
import {withRouter} from 'react-router-dom';
import poster from '../Asset/slider.png';

const history = createBrowserHistory();

class CoursesMapped extends Component{
    constructor(props){
        super(props);
        this.cardData = [];
        this.setData = this.setData.bind(this);
        this.courseDetail = this.courseDetail.bind(this);
    }

    courseDetail = (event,course) => {
        this.props.history.push({pathname:'/course-detail/',state:course,search:"?id="+course._id})
    }

    setData = () => {
        const that = this;
        let filtredData = [];
        filtredData = this.cardData.map(function (course,index){
            let price = parseInt(course.price);
            let offer = parseInt(course.offer);
            let discount = parseInt(price - ((price * offer) / 100));
            return(<Media className="main-wrap" key={index}>
                <Media left>
                    <Media object src={poster} height="100px" width="100px"/>
                </Media>
                <Media body>
                    <Media heading>
                        <div className='course-wrap'>
                            <div className='d-flex flex-column w-75'>
                                <p>{course.course_Name}</p>
                                <p className="instructorName">{course.created_By.join(',')}</p>
                            </div>
                            <div className='d-flex flex-column remove-text'>
                                <p><a onClick={(event) =>that.courseDetail(event,course)}>{"Detail"}</a></p>
                            </div>
                            <div className='price-list'>
                                <p>{discount}</p>
                                <p><strike>{price}</strike></p>
                            </div>
                        </div>
                    </Media>
                    <div>

                    </div>
                </Media>
            </Media>);
        });

        return filtredData;
    }

    render(){
        this.cardData = [];
        this.cardData = this.props.cardData;
        return(
            <div>
                <div>
                {this.setData()}
                </div>
            </div>
        );
    }
}

export default withRouter(CoursesMapped);
