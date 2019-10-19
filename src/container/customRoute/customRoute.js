import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class CustomRoute extends Component{

    getExtractedJson({component, cprivate, crole, userRegisterLog, ...rest}){
        return rest;
    }
    render(){
        const isUserLoggedIn = this.props.userRegisterLog.userDetail != null ?
            this.props.userRegisterLog.userDetail.token != null : false;
        let role = null;
        if(isUserLoggedIn){
                role = this.props.userRegisterLog.userDetail.role;
        }
        const rest = this.getExtractedJson(this.props);
        const {component,cprivate,crole} = this.props;
        const Component = component;


        let redirectTo = undefined;

        if(!isUserLoggedIn && cprivate){
            redirectTo = '/';
        }
        else if(isUserLoggedIn && cprivate && crole && crole.filter((chkrole) => chkrole === role).length === 0){
            redirectTo = '/';
        }
        return(
            <Route {...rest} render = {props => (
                (redirectTo)? <Redirect to={{pathname:redirectTo, state:{from:props.location}}}/>
                    : <Component {...props}/>
            )}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const {userRegisterLog} = state;
    return {
        userRegisterLog: userRegisterLog
    }
};

export default connect(mapStateToProps,null)(CustomRoute);
