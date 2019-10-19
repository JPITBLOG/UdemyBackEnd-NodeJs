import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createBrowserHistory} from 'history';
import {withRouter} from 'react-router-dom';
import * as subCategoryAction from '../action/subCategory';
import * as addCourseAction from '../action/addCourse';
import * as coursesdetailAction from '../action/coursedetail';
import { Button, Form, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,Alert } from 'reactstrap';
import Multiselect from 'multiselect-dropdown-react';
import '../container/App/App.css';
import './addCourse.css';
import AdminavBar from "./adminNavbar";

const history = createBrowserHistory();

class Content extends Component{
    render(){
        return(
            <FormGroup>
                <Label for="learn">Conten</Label>
                    <Input type="text" name="contentName" id={this.props.contentNameid} />
                    <Input type="textarea" name="subContent" id={this.props.contentDescid} />
            </FormGroup>
        );
    }
}

class AddCourse extends Component{
    constructor(props){
        super(props);
        this.instructor_id = [];
        this.instructorArray = null;
        this.SubcategoryMapped = [];
        this.instructorMapped = [];
        this.state = {techId : {selected:'',_id:''},
                    instructor : null,
                    course_Name : null,
                    course_Subtitle : null,
                    learn : null,
                    courseContent : [],
                    requirement : null,
                    description : null,
                    price : null,
                    offer : null,
                    inputs: ['input-0'],
                    Alert: 0,
                    errors: {},
                    editFlag : 0};
        this.ontopic = this.ontopic.bind(this);
        this.course_submit = this.course_submit.bind(this);
        this.result = this.result.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    ontopic = (e,selected,_id) => {
        e.preventDefault();
        this.setState({techId:{selected,_id}})
    }

    handleChange = (e,statename) => {
        this.setState({ [statename] : e.target.value});
    }

    result = (params) => {
        this.setState({instructor : params})

    }

    handleValidation = () => {
        let numFormat = /^[0-9]+$/;
        let errors = {};
        let formIsValidate = true;
        let technology = this.state.techId.selected;
        let instructor = this.state.instructor;
        let course_Name = this.state.course_Name;
        let course_Subtitle = this.state.course_Subtitle;
        let learn = this.state.learn;
        let requirement = this.state.requirement;
        let description = this.state.description;
        let price = this.state.price;
        let offer = this.state.offer;
        let courseContent = this.state.courseContent;

        //technology
        if(technology == ''){
                errors["technology"] = "please select technology";
                formIsValidate = false;
        }

        //instructor
        if(instructor == null){
                errors["instructor"] = "please select instructor";
                formIsValidate = false;
        }

        //courseName
        if(course_Name == null || course_Name.length < 5){
            if(course_Name == null){
                errors["course_Name"] = "Cannot be empty";
            }
            else if(course_Name.length < 5){
                errors["course_Name"] = "required atleast 5 character";
            }
            formIsValidate = false;
        }
        //courseSubtitle
        if(course_Subtitle == null || course_Subtitle.length < 5){
            if(course_Subtitle == null){
                errors["course_Subtitle"] = "Cannot be empty";
            }
            else if(course_Subtitle.length < 5){
                errors["course_Subtitle"] = "required atleast 5 character";
            }
            formIsValidate = false;
        }
        //learn
        if(learn == null || learn.length < 10){
            if(learn == null){
                errors["learn"] = "Cannot be empty";
            }
            else if(learn.length < 10){
                errors["learn"] = "required atleast 10 character";
            }
            formIsValidate = false;
        }

        //content
        if(this.state.courseContent.length){
            if(this.state.courseContent[0]){
                if(!("content_Name" in this.state.courseContent[0]) || !("content_Name" in this.state.courseContent[0])){
                    errors["courseContent"] = "Cannot be empty";
                    formIsValidate = false;
                }
            }
        }
        else {
            errors["courseContent"] = "Cannot be empty";
            formIsValidate = false;
        }

        //requirement
        if(requirement == null || requirement.length < 15){
            if(requirement == null){
                errors["requirement"] = "Cannot be empty";
            }
            else if(requirement.length < 15){
                errors["requirement"] = "required atleast 15 character";
            }
            formIsValidate = false;
        }

        //description
        if(description == null || description.length < 15){
            if(description == null){
                errors["description"] = "Cannot be empty";
            }
            else if(description.length < 15){
                errors["description"] = "required atleast 15 character";
            }
            formIsValidate = false;
        }

        //price
        if(price == null || price.length > 0){
            if(price == null){
                errors["price"] = "Cannot be empty";
            }
            else if(price.length > 2){
                if(!price.match(numFormat)){
                    errors["price"] = "required numbar value";
                    formIsValidate = false;
                }
            }
            else if(!price.length > 2){
                errors["price"] = "required atleast 3 numeric value";
                formIsValidate = false;
            }

        }

        //offer
        if(offer == null || offer.length > 0){
            if(offer == null){
                errors["offer"] = "Cannot be empty";
                formIsValidate = false;
            }
            else if(offer.length > 0){
                if(!offer.match(numFormat)){
                    errors["offer"] = "required numbar value";
                    formIsValidate = false;
                }
            }

        }

        this.setState({errors:errors});
        return formIsValidate;
    }

    course_submit = async (e) => {
        e.preventDefault();
        if(this.handleValidation()){
            let learn = null;
            let requirement = null;
            this.instructor_id = [];
            const that = this;
            let category_Id = this.state.techId._id;
            let category_Name = this.state.techId.selected;
            this.instructorArray.map(function (instructor,index) {
                that.state.instructor.map(function (instructSelect) {
                    if(instructor.name == instructSelect){
                        that.instructor_id.push(instructor._id);
                    }
                })
            })
            let created_By = this.instructor_id;
            let language = "English";
            let course_Name = this.state.course_Name;
            let course_Subtitle = this.state.course_Subtitle;
            if(this.state.learn.includes(","))
                learn = this.state.learn.split(",");
            else
                learn = [this.state.learn];
            let course_content = this.state.courseContent;
            if(this.state.requirement.includes(","))
                requirement =  this.state.requirement.split(",");
            else
                requirement = [this.state.requirement];
            let description = this.state.description;
            let price = this.state.price;
            let offer = this.state.offer;
            let passDataObject = {category_Id,category_Name,created_By,language,course_Name,course_Subtitle,
                learn,course_content,requirement,description,price,offer}
            let APIresponse = await (this.props.action.addCourse.addcourse(passDataObject));
            if(APIresponse){
                await (this.props.action.coursesdetail.getAllCourses());
                this.instructor_id = [];
                this.instructorMapped = [];
                this.setState({techId : {},
                    instructor : null,
                    course_Name : null,
                    course_Subtitle : null,
                    learn : null,
                    courseContent : [],
                    requirement : null,
                    description : null,
                    price : null,
                    offer : null,
                    inputs: ['input-0'],
                    Alert: 1});
                this.props.history.push({pathname:'/adminpenal/addcourse/addvideo/',state:course_Name});
            }
        }

    }

    componentDidMount(){
        this.props.action.subCategory.getAllSubcategories();
    }

    render(){
        const that = this;
            that.instructorMapped = [];
            if(this.props.subCategory.Allsubcategory.length > 0){
                this.props.subCategory.Allsubcategory.map(function (subcategory,index) {
                    that.SubcategoryMapped.push(
                        <DropdownItem disabled>{subcategory.subcategory}</DropdownItem>,
                            subcategory.subcategoryArray.map(function (subTopic,index) {
                                if(subTopic.slice(0,3) !== "All"){
                                return (<DropdownItem onClick={(event) => {that.ontopic(event,subTopic,subcategory._id)}}>{subTopic}</DropdownItem>);
                                }
                            }),
                        <DropdownItem divider />
                    )

                });
            }

        if(this.props.instructor.AllInstructor.length >0){
            this.instructorArray = this.props.instructor.AllInstructor;
            this.instructorArray.map(function (instructor,index) {
                that.instructorMapped.push({"name":instructor.name,"value":instructor.name,"_id":instructor._id});
            })
        }

        return(
            <div>
                <AdminavBar/>
                {this.state.Alert == 1 ? (<Alert color="success">course added successfully!</Alert>) :
                    null }

            <Form id = "addCourseForm">
                <FormGroup className="addform">
                    <Label for="exampleEmail"> Select Technology</Label>
                    <UncontrolledDropdown>
                        <DropdownToggle caret>
                            Technology
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.SubcategoryMapped}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <span style={{color: "red"}}>{this.state.errors["technology"]}</span>
                    <Input type="text" name="selectedTech" id="selectedTech" value={this.state.techId.selected || ''}/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Instructor</Label>
                    <div className="App">
                    <Multiselect id="multi-select" options={this.instructorMapped} onSelectOptions={this.result} />
                    <span style={{color: "red"}}>{this.state.errors["instructor"]}</span>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Course-Name</Label>
                        <Input onChange = {(event) => this.handleChange(event,'course_Name')} value={this.state.course_Name || ''} type="text" name="course_name" id="course_name"/>
                        <span style={{color: "red"}}>{this.state.errors["course_Name"]}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Course-Subtitle</Label>
                    <Input onChange = {(event) => this.handleChange(event,'course_Subtitle')} value={this.state.course_Subtitle || ''} type="text" name="course_title" id="course_title" />
                    <span style={{color: "red"}}>{this.state.errors["course_Subtitle"]}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="learn">What you'll learn</Label>
                    <Input onChange = {(event) => this.handleChange(event,'learn')} value={this.state.learn || ''} type="textarea" name="learn" id="learn" />
                    <span style={{color: "red"}}>{this.state.errors["learn"]}</span>
                </FormGroup>
                <div>
                    <div id="dynamicInput">
                            {this.state.inputs.map((input,index) => <Content contentNameid = {'cname'+index}
                                                                             contentDescid = {'cdesc'+index}key={input} />)}
                        <span style={{color: "red"}}>{this.state.errors["courseContent"]}</span>
                    </div>
                    <button onClick={ (e) => this.appendInput(e,null) }>
                        SUBMIT
                    </button>
                    <button onClick={ (e) => this.appendInput(e,"addInput") }>
                        ADD ANOTHER INPUT
                    </button>
                </div>
                <FormGroup>
                    <Label for="learn">Setup Requirement</Label>
                    <Input onChange = {(event) => this.handleChange(event,'requirement')} value={this.state.requirement || ''} type="textarea" name="setup" id="setup" />
                    <span style={{color: "red"}}>{this.state.errors["requirement"]}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="learn">Description</Label>
                    <Input onChange = {(event) => this.handleChange(event,'description')} value={this.state.description || ''} type="textarea" name="desc" id="desc" />
                    <span style={{color: "red"}}>{this.state.errors["description"]}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input onChange = {(event) => this.handleChange(event,'price')} value={this.state.price || ''} type="text" name="price" id="price" />
                    <span style={{color: "red"}}>{this.state.errors["price"]}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="offer">Offer</Label>
                    <Input onChange = {(event) => this.handleChange(event,'offer')} value={this.state.offer || ''} type="text" name="offer" id="offer" />
                    <span style={{color: "red"}}>{this.state.errors["offer"]}</span>
                </FormGroup>
                <Button onClick={(event) => {this.course_submit(event)}}>Submit</Button>
            </Form>
            </div>
        );
    }

    appendInput(e,submitType) {
        e.preventDefault();
        let descArray = null;
        let currentAppendId = this.state.inputs.length - 1;
        let cname = document.getElementById('cname'+currentAppendId).value;
        let cdesc = document.getElementById('cdesc'+currentAppendId).value;
        if(cdesc.includes(","))
            descArray = cdesc.split(",");
        else
            descArray = [cdesc];
        this.setState({courseContent:[...this.state.courseContent,{"content_Name":cname,"sub_Content":descArray}]})
        if(submitType == "addInput"){
            var newInput = `input-${this.state.inputs.length}`;
            this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput])}));
        }
    }
}

const mapStateToProps = (state) => {
    const { subCategory,instructor}  = state;
    return {
        subCategory : subCategory,
        instructor:instructor
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        subCategory: bindActionCreators(subCategoryAction, dispatch),
        addCourse: bindActionCreators(addCourseAction,dispatch),
        coursesdetail: bindActionCreators(coursesdetailAction,dispatch)
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddCourse));
