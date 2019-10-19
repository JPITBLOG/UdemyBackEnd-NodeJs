import React,{Component} from 'react';
import { Media,NavLink} from 'reactstrap';
import {Link} from "react-router-dom";
import './topicBanner.css';
import banner from '../../Asset/entry-default.jpg';

class Banner extends Component{

    render(){
        return(
            <>
                <div>
                    <Media className="media-wrap">
                        <Media body>
                            <h5 className="text-white"> Find the right Android Development course for you</h5>
                            <p>Answer a few questions to see what we'd recommend for you.</p>
                            <div><NavLink tag={Link} to="/" className="p-0"><h6 className="text-white">Get started ></h6></NavLink></div>
                        </Media>
                        <Media right>
                        <Media object src={banner}/>
                        </Media>
                    </Media>
                </div>
                </>
            );

        }
    }

export default Banner;
