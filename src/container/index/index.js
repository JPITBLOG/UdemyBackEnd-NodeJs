import React,{Component} from 'react';
import Slider from "../slidar/slidar";
import Subslider from "../slidar/subslider";
import TabSlider from "../slidar/tab_Slider";
import Ptopic from "../courses/popularTopic";
class Index extends Component{
    render(){
        return(
            <div>
                <Slider/>
                <Subslider/>
                <TabSlider/>
                <Ptopic/>
            </div>
            );
        }
}

export default Index;
