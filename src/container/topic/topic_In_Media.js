import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Media} from 'reactstrap';
import './topic_In_Media.css';
import poster from '../../Asset/slider.png';
import banner from '../../Asset/entry-default.jpg';
import filterTopic from "../../reducer/filterTopic";

class MediaTopic extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sortedBy : null
        }
    }
    myfun = () => {

        const that = this;
        let filtredData = [];
        let coursesFiltered = [];
        let selectedTopic = [];
        let topics;
        topics = JSON.parse(localStorage.getItem("topic"));
        if(topics !== null && topics.length>0){

            topics.map(function (topic) {
                let filtredmarge;
                filtredmarge = that.props.courses.AllCourses.filter(courses => {

                    if(courses.category_Name === topic){
                        let price = parseInt(courses.price);
                        let offer = parseInt(courses.offer);
                        let discount = parseInt(price - ((price * offer) / 100));
                        if(that.state.sortedBy === "lowestPrice"){
                            if(discount<500){
                                return courses;
                            }
                        }
                        else if(that.state.sortedBy === "highestPrice"){
                            if(discount>500){
                                return courses;
                            }
                        }
                        else {
                            return courses;
                        }
                    }
                });
                filtredmarge.map(function (filtredelement){
                    coursesFiltered.push(filtredelement);
                });
            });
        }
        else {
            if(localStorage.getItem("selectedTopic") !== null) {
                selectedTopic =  JSON.parse(localStorage.getItem("selectedTopic"));
            }
            selectedTopic.map(function (stopic,index){
                that.props.courses.AllCourses.map(courses => {
                    if(courses.category_Name === stopic){
                        let price = parseInt(courses.price);
                        let offer = parseInt(courses.offer);
                        let discount = parseInt(price - ((price * offer) / 100));
                        if(that.state.sortedBy === "lowestPrice"){
                            if(discount<500){
                                coursesFiltered.push(courses);
                            }
                        }
                        else if(that.state.sortedBy === "highestPrice"){
                            if(discount>500){
                                coursesFiltered.push(courses);
                            }
                        }
                        else {
                            coursesFiltered.push(courses);
                        }
                    }

                });
            });
        }

        filtredData = coursesFiltered.map(function (course,index){
            let price = parseInt(course.price);
            let offer = parseInt(course.offer);
            let discount = parseInt(price - ((price * offer) / 100));
             return (<Media className="main-wrap" key = {index}>
                <Media left>
                    <Media object src={poster} height = "200px" width = "200px"/>
                </Media>
                <Media body>
                    <Media heading>
                        <div className='course-wrap'>
                            <div>
                                {course.course_Name}
                            </div>
                            <div className='price-list'>
                                <p>{discount}</p>
                                <p><strike>{course.price}</strike></p>
                            </div>
                        </div>
                    </Media>
                    {course.course_Subtitle}
                    <div>
                    </div>
                    <div>
                    </div>
                </Media>
            </Media>)
        });
        return filtredData;
    }

    setsortedState = (event) => {
        let setvalue = event.target.value;
        this.setState({
            sortedBy:setvalue
        });
    }

    render(){
        return(
            <div>
                <table>
                    <tbody>
                <tr className="hide_all">
                    <td>
                <select id="select" onChange = {this.setsortedState.bind(this)}>
                    <option value="0">Sort</option>
                    <option value="lowestPrice">Lowest Price</option>
                    <option value="highestPrice">Highest Price</option>
                </select>
                    </td>
                    <td>Courses</td>
                </tr>
                    </tbody>
                </table>
                {this.myfun()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { categorydetail,courses,filterTopic}  = state;
    return {
        categorydetail : categorydetail,
        courses : courses,
        filterTopic : filterTopic
    }
};

export default connect(mapStateToProps)(MediaTopic);
