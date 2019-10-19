import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './filter.css';
import {Button, Collapse, FormGroup} from "reactstrap";
import * as filterTopicAction from "../../action/filterTopic";

class Filter extends Component {
    constructor(props) {
        super(props);
        this.topicStorage = [];
        this.toggle = this.toggle.bind(this);
        this.OnChangeCheckbox = this.OnChangeCheckbox.bind(this);
        this.state = {collapse: false,matchedArray : null};
    }

    toggle() {
        this.setState(state => ({collapse: !state.collapse}));
    }

    OnChangeCheckbox = (event) => {
        if(event.target.checked){
            this.props.action.filterTopicAction.addfilteredTopic(event.target.name,event.target.value);
            // this.props.filterTopicAction.addfilteredTopic(event.target.name,event.target.value);
        }
        else {
            this.props.action.filterTopicAction.removefilteredTopic(event.target.name,event.target.value);
        }

    };
    getChecked = (courseType,courseName) => {
        if(localStorage.getItem(courseType) !== null) {
            if (JSON.parse(localStorage.getItem(courseType)).includes(courseName))
                return true
        }
    }


    render() {
        let matchedTopicArray = [];
        let matchedSubArray = [];
        let topic = this.props.topic;
        let language = [];

        this.props.categorydetail.Allcategory.map(function (categories, index) {
            categories.subcategory.map(function (subcategories, index) {
                let matchsubcategoryArray = categories.subcategory.slice(0);
                if(subcategories.name === topic){
                    matchedSubArray = matchsubcategoryArray;
                    matchsubcategoryArray.map(function (subcategory,index){
                        if(subcategory.subcategory.length >0){

                            subcategory.subcategory.map(function (subcategories) {
                                matchedTopicArray.push(subcategories);
                            });
                        }
                    });

                }
                else {
                    if(subcategories.subcategory.length > 0){
                        let matchArray = subcategories.subcategory.slice(0);

                        subcategories.subcategory.map(function (categories, index) {
                            if (categories.name === topic) {
                                matchedTopicArray = null;
                                matchedSubArray = null;
                                matchArray.splice(index, 1);
                                matchedTopicArray = matchArray;
                                matchedSubArray = matchsubcategoryArray;
                            }
                        })

                        matchedTopicArray = matchedTopicArray.filter(function (subcategory) {
                            return subcategory.name.slice(0,3) !== "All"
                        });

                    }
                }
            });
        });
        const uniqueLanguage = [...new Set(this.props.courses.AllCourses.map(course => course.language))];
        return (
            <div className="ios-add">
                <h2 className="topic--section-heading--UrZPh"> {topic} courses</h2>
                <span className="track-impression--waypoint--wvgq2"><span></span></span>
                <p className="mt-space-xs mb-space-0" data-purpose="secondary-description">Udemy hosts top-rated iOS
                    development instructors who are experts at showing students how to master the art of developing apps
                    for Apple products. Whether you’re interested in developing for the iPhone, iPad, or MacBook, Udemy
                    has a course to help you achieve your goals.</p>
                <div className="filter-btn-wrap mt-3">
                    <Button  onClick={this.toggle}>{this.state.collapse ? "Done" : "Filter"}</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <FormGroup>
                            <table>
                                <thead>
                                <tr className="hide_all">
                                    <th colSpan={3}></th>
                                </tr>
                                <tr className="hide_all">
                                    <th>Topic</th>
                                    <th>Subcategory</th>
                                    <th>Language</th>
                                </tr>
                                </thead>
                                <tbody>

                                {(() => {
                                    let maxarrayLength = 0;
                                    let newArray = [];
                                        try {
                                            maxarrayLength = Math.max(matchedTopicArray.length, matchedSubArray.length);
                                            for (let i = 0; i < maxarrayLength; i++) {
                                                newArray.push(<tr className="hide_all">
                                                    {matchedTopicArray[i] ?
                                                        <td><input type="checkbox" name="topic"
                                                                   onClick={this.OnChangeCheckbox}
                                                                   value={matchedTopicArray[i].name}
                                                                   defaultChecked={this.getChecked("topic", matchedTopicArray[i].name)}/>{matchedTopicArray[i].name}
                                                        </td>
                                                        : <td></td>}
                                                    {matchedSubArray[i] ?
                                                        <td><input type="checkbox" name="subcategory"
                                                                   onClick={this.OnChangeCheckbox}
                                                                   value={matchedSubArray[i].name}
                                                                   defaultChecked={this.getChecked("subcategory", matchedSubArray[i].name)}/>{matchedSubArray[i].name}
                                                        </td>
                                                        : <td></td>}
                                                    {uniqueLanguage[i] ?
                                                        <td><input type="checkbox" name="language"
                                                                   defaultChecked={this.getChecked()}
                                                                   value={uniqueLanguage[i]}/>{uniqueLanguage[i]}
                                                        </td>
                                                        : <td></td>}
                                                </tr>);
                                            }
                                            return newArray;
                                        }
                                        catch (e) {
                                            return (<div>There is no data available</div>);
                                        }
                                    })()}
                                </tbody>
                            </table>
                        </FormGroup>
                    </Collapse>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    const {categorydetail,courses} = state;
    return {
        categorydetail: categorydetail,
        courses: courses
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        filterTopicAction: bindActionCreators(filterTopicAction, dispatch)
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Filter);
