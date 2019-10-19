import React,{Component} from 'react';
import {connect} from 'react-redux';
import CoursesMapped from './Coursesmapped';

class Courses extends Component{
    constructor(props) {
        super(props);
        this.CardData = [];
        this.state = {
            topic: null,
            instructor: null
        }
    }

    addInArray = () => {
        let CardIndex = 0;
        let AllTopic = [];
        let AllTopicIndex = 0;
        const that = this;

        let topic = this.props.topic;
        let instructor = this.props.instructor;
        try{
            if(this.props.instructor == null){
                this.props.categorydetail.Allcategory.map(function (category,index) {
                    if(category.name === topic) {
                        category.subcategory.map(function (subcategory,index) {
                            if(subcategory.subcategory !== [] && subcategory.subcategory.length > 0){
                                subcategory.subcategory.map(function (subTopic,index){
                                    AllTopic[AllTopicIndex] = subTopic.name;
                                    AllTopicIndex++;
                                })
                            }
                        })
                    }
                });

                this.props.courses.AllCourses.map(function (course,index){
                    AllTopic.map(function (topic,index) {
                        if(topic === course.category_Name){
                            that.CardData[CardIndex] = course;
                            CardIndex = CardIndex+1;
                        }
                    })
                });
            }
            else {
                this.props.courses.AllCourses.map(function (course,index){
                        if(course.created_By.includes(instructor)){
                            that.CardData[CardIndex] = course;
                            CardIndex = CardIndex+1;
                        }
                });
            }

        }
        catch (e) {
            console.log("there is an error :",e);
        }


    };

    render(){
        this.CardData = [];
        this.addInArray();
        return(
            this.CardData ? (
                <div>
                    {this.props.instructor !=null ? (<div>{'instructor : '+this.props.instructor}</div>) : (<div>{this.props.topic+' courses'}</div>)}

                    <CoursesMapped cardData = {this.CardData}/>
                </div>
                ):(
                <div>There is no any data available</div>
            )
        );
    }
}

const mapStateToProps = (state) => {
    const { categorydetail,courses}  = state;
    return {
        categorydetail : categorydetail,
        courses : courses
    }
};

export default connect(mapStateToProps,null)(Courses);
