import React,{Component} from 'react';
import {createBrowserHistory} from 'history';
import {withRouter} from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const history = createBrowserHistory();

class AdminavBar extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.addCourseAction = this.addCourseAction.bind(this);
        this.goToadmin = this.goToadmin.bind(this);
        this.addInstructorAction = this.addInstructorAction.bind(this);
        this.state = {
            collapsed: true
        };
    }

    goToadmin = () => {
        this.props.history.push({pathname: '/adminpenal/'});
    }

    addCourseAction = () => {
        this.props.history.push({pathname:'/adminpenal/addcourse/'});
    }

    addInstructorAction = () => {
        this.props.history.push({pathname:'/adminpenal/addinstructor/'});
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        return (
            <div>
                <Navbar color="faded" light>
                        <NavbarBrand onClick = {this.goToadmin} className="mr-auto">Admin</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink onClick={this.addCourseAction}>Add Course</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.addInstructorAction}>Add Instructor</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(AdminavBar);
