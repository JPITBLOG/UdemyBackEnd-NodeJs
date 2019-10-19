import React,{Component} from 'react';
import FacebookLogin from "react-facebook-login";

class Facebook extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn:false,
            userID:'',
            name:'',
            email:'',
            picture:""
        }
    }

    componentClicked = () => {
    }

    responseFacebook = (response) => {
        this.setState({
            isLoggedIn:true,
            userID: response.userID,
            name:response.name,
            email:response.email
        },this.props.toggle());

    }

    render(){
        let fbContent;

        if(this.state.isLoggedIn){
            fbContent = null;
        }
        return (<div><FacebookLogin
                    appId="381088995912800"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.responseFacebook}
                    // callback={this.responseFacebook}
                    /></div>);
    }
}

export default Facebook;
