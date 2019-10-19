import React,{Component} from 'react';
import './slider.css';
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Slider extends Component{

    render() {
        return(
            <div>
            <div className = "sliderComponent">
                <div className="carousel-fullscreen-sidebar">
                    <div className="streamer__content">
                        <h2> Learn on your schedule </h2>
                       <p>
                            Anywhere, anytime. Enjoy risk-free with our 30-day, money-back guarantee.
                       </p>
                        <script type="text/javascript">
                            UD.performance.mark('Home.search-rendered');
                            UD.performance.sync();
                        </script>
                        <MuiThemeProvider>
                            <SearchBar
                                style={{width: "100%"}}
                                onChange={() => console.log('onChange')}
                                onRequestSearch={() => console.log('onRequestSearch')}
                            />
                        </MuiThemeProvider>

                    </div>
                </div>
            </div>
                    </div>
        );
    }
}

export default Slider;