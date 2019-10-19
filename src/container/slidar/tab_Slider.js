import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';

import Display from "../courses/coursesSlider";


class TabSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key:null
        };
        this.handleSelect = this.handleSelect.bind(this)
    }
    handleSelect(key) {
        if(key != this.state.key){
            this.setState({key});
        }
    }

    getAllcategory(){
        let categoryFilter = [];
        let Allfilteredtopic = [];
        let categoryTab = [];
        const that = this;
        try {
            this.props.categorydetail.Allcategory.map(function (category, index) {

                let subcategoryFilter = category.subcategory.filter((subcategory) => {
                    return subcategory.subcategory.length > 0;
                })
                if (subcategoryFilter.length > 0) {
                    categoryFilter.push(category.name);
                    let ctgryTopic = [];
                    subcategoryFilter.map(function (subtopic, index) {
                        subtopic.subcategory.map(function (topic, index) {
                            ctgryTopic.push(topic.name);
                        })
                    });
                    Allfilteredtopic.push(ctgryTopic);
                }
            });
            if(that.state.key == null){
                that.setState({key:categoryFilter[0]})
            }

            categoryFilter.map(function (category, index) {
                categoryTab.push(<Tab key={category} eventKey={category} title={category}>{category}</Tab>);
            });

            return categoryTab;
        }
        catch (e) {
            console.log("there is an error while fetching subcategory data: ",e);
        }
    }

    render () {
        return(
            <div>
                <Tabs activeKey={this.state.key} onSelect={this.handleSelect}
                      id="controlled-tab-example">
                    {this.getAllcategory()}
                </Tabs>
                <Display topic={this.state.key}/>
            </div>
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

export default connect(mapStateToProps)(TabSlider);
