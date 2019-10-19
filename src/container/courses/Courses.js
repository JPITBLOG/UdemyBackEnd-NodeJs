import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Nav, NavItem, NavLink} from 'reactstrap';
import Display from "./coursesSlider";
import Ptopic from "./popularTopic";
import InstructorSlider from './instructor';
import './Courses.css';

class Courses extends Component {

    constructor(props) {
        super(props);
        this.matchCategory = false;

    }

    clickHandle = (event, getCategoryArray) => {
        let path = getCategoryArray[0];
        path = path.toLowerCase();
        path = path.replace(" ", "-");

        this.props.history.push({pathname: '/' + getCategoryArray[1] + '/', state: getCategoryArray[0]});
    };

    subcategories = (subcategory) => {
        let scategory = [];
        scategory = subcategory.filter(function (subcategory) {
            return subcategory.name.slice(0, 3) !== "All"
        });
        scategory = scategory.map((category) => {
            return (<div className="navbar-item">
                <NavItem>
                    <NavLink onClick={(event) => this.clickHandle(event, [category.name, "courses"])}
                             key={category.name}>{category.name}</NavLink>
                </NavItem>
            </div>)
        });
        return scategory;
    };

    getCategory = () => {

        const that = this;
        let subCategoryarray;
        // let appendArray;
        // let appendSubArray;

        this.props.categorydetail.Allcategory.map(async function (category) {
            if (category.name === that.props.location.state) {

                subCategoryarray = null;
                subCategoryarray = category;
                that.matchCategory = true
            } else {
                await category.subcategory.map(function (subCategories) {
                    if (subCategories.name === that.props.location.state) {
                        // return category;
                        subCategoryarray = null;
                        subCategoryarray = category;
                        subCategories.subcategory.length ? that.matchCategory = true : that.matchCategory = false

                    }
                });
            }

        });
        return (
            <Nav className="navbar-wrap">
                <NavItem>
                    <NavLink key={subCategoryarray.name}
                             onClick={(event) => that.clickHandle(event, [subCategoryarray.name, "courses"])}>{subCategoryarray.name}</NavLink>
                </NavItem>
                {this.subcategories(subCategoryarray.subcategory)}
            </Nav>
        );

    };

    render() {
        const getcategory = this.getCategory();
        const h1Style = {
            'margin-top': '0px'
        };
        return (

            this.matchCategory ? (


                <div key={"courses"}>
                    {getcategory}
                    <div className="main-class" key={this.props.location.state}
                         className="course-container jumbotron__collapsed browse-full-width-container--full-width-container--1v4rg browse-full-width-container--is-desktop--169rt">
                        <div className="browse-container suppress-xl jumbotron__title" style={h1Style}>
                            <h1 className="gradiant-course"><p className="course-header">{this.props.location.state}</p>
                            </h1>
                        </div>
                        <div className="course-content">
                            <h2 className="category--section-title--3SLWt">Courses to get you started</h2>

                            <Display topic={this.props.location.state}/>
                            <div className="unit-title--title-box--3tVMv">
                                <h2 className="c_discovery-units__title" data-us="0"
                                    data-purpose="discovery-unit-1953376954">
                                    Popular topics
                                </h2>
                            </div>
                            <Ptopic/>
                            <div className="unit-title--title-box--3tVMv">
                                <h2 className="c_discovery-units__title" data-us="0"
                                    data-purpose="discovery-unit-1953376954">
                                    Popular Instructors
                                </h2>
                            </div>
                            <InstructorSlider/>
                        </div>
                    </div>
                </div>
            ) : <h3>Data is not available</h3>
        );
    }
}

const mapStateToProps = (state) => {
    const {categorydetail} = state;
    return {
        categorydetail: categorydetail
    }
};

export default connect(mapStateToProps)(Courses);
