import React,{Component} from 'react';
import {connect} from 'react-redux';
class InstructorCourses extends Component{
    constructor(props){
        super(props);
        this.instructorMapped = [];
    }

    getAllInstructor = () => {
        const that = this;
        if(this.props.instructor.AllInstructor.length >0){
            this.instructorArray = this.props.instructor.AllInstructor;
            this.instructorArray.map(function (instructor,index) {
                this.instructorMapped.push({"name":instructor.name,"value":instructor.name,"_id":instructor._id});
            })
    }

}

    render(){
        return(
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {instructor}  = state;
    return {
        instructor:instructor
    }
};

export default connect(mapStateToProps,null)(InstructorCourses);
