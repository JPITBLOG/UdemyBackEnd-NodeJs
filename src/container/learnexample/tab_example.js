import React, {Component} from 'react'
import { Tabs, Tab } from 'react-bootstrap';

class TabPuzzle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 2
        };
        this.handleSelect = this.handleSelect.bind(this)
    }
    handleSelect(key) {
        alert('selected ' + key);
        this.setState({key});
    }
    render () {
        return (
            <div>
                <Tabs activeKey={this.state.key} onSelect={this.handleSelect}
                      id="controlled-tab-example">
                    <Tab eventKey={1} title="Tab 1"> Tab Content 1 </Tab>
                    <Tab eventKey={2} title="Tab 2"> Tab Content 2 </Tab>
                    <Tab eventKey={3} title="Tab 3"> Tab Content 3 </Tab>
                </Tabs>
                <button onClick={()=>this.handleSelect("3")}>Go to tab 3</button>
            </div>
        );
    }
}

export default TabPuzzle;