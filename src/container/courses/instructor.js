import './instructor.css';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';


class Cards extends Component {
    constructor(props){
        super(props);
        this.CardData = [];
    }
    addInArray = () => {
        let instructorArray = [];
        let CardIndex = 0;
        const that = this;
        this.CardData = this.props.allInstructor;
        this.CardData.map((card,index) => {
            const profession = () => {
                let strtStopIndex = 0;
                let breakWordLength = 0;
                let instructorSplit = card.profession.split(' ');
                for(let i = 0;i<instructorSplit.length;i++){
                    card.profession.indexOf(instructorSplit[i]);

                    breakWordLength = card.profession.indexOf(instructorSplit[i])+instructorSplit[i].length;
                    if(breakWordLength > 25){
                        strtStopIndex =  card.profession.indexOf(instructorSplit[i]);
                        break;
                    }
                };
                return (card.profession.substring(0, (strtStopIndex-1))+ "<br>" + card.profession.substring(strtStopIndex,card.profession.length));

            };
            instructorArray.push(<>
                                    <div className="InstructorCard mt-3 mb-3" id="card" style={this.props.cardStyle} key={card._id}>

                                        <div>
                                            <div className="card-wrap">
                                                <img className="card-img" src={card.own_Img} width="135" height="135" alt="Avatar"/>
                                                <p className="name">{card.name}</p>
                                                <div className="profession wrep">{card.profession}</div>
                                                <p className="courses">{card.courses}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>)
        })
        return instructorArray;
    };

    render() {
        return (
            <section>
                {
                    this.addInArray()
                }
            </section>
        )
    }
}

class InstructorSlider extends Component {
    constructor(props) {
        super(props);
        this.CardData = [];
        this.CardDataLength = null;
        this.state = {
            currentCard: 0,
            position: 0,
            nextClickCount: 0,
            cardStyle: {
                transform: 'translateX(0px)'
            },
            width: 0,
        };
    }

    componentDidMount() {
        let boxWidth = document.getElementById("card").clientWidth;
        this.setState({ width: boxWidth });
        let nextClickCount = this.CardDataLength - 4;
        this.setState({
            nextClickCount:nextClickCount
        });
    }
    // func: click the slider buttons
    handleClick(type) {
        const cardLimit = 4;
        // get the card's margin-right
        let margin = window.getComputedStyle(document.getElementById("card")).marginRight;
        margin = JSON.parse(margin.replace(/px/i, ''));

        const cardWidth = this.state.width; // the card's width
        const cardMargin = margin; // the card's margin
        const cardNumber = this.CardDataLength; // the number of cards
        let currentCard = this.state.currentCard; // the index of the current card
        let position = this.state.position; // the position of the cards

        // slide cards
        if(type === 'next' && currentCard < cardNumber-1 && this.state.nextClickCount >0) {
            currentCard++;
            this.setState({nextClickCount:this.state.nextClickCount-1});
            position -= (cardWidth+cardMargin);
        } else if(type === 'prev' && currentCard > 0) {
            currentCard--;
            this.setState({nextClickCount:this.state.nextClickCount+1});
            position += (cardWidth+cardMargin);
        }
        this.setCard(currentCard, position);
    }

    setCard(currentCard, position) {
        this.setState({
            currentCard: currentCard,
            position: position,
            cardStyle: {
                transform: `translateX(${position}px)`
            }
        })
    }
    addInstructor = () => {
        let allInstructor = [];
        allInstructor = this.props.instructor.AllInstructor.slice(0);
        return allInstructor;
    }

    render() {
        this.CardData = this.addInstructor();
        this.CardDataLength = this.props.instructor.AllInstructor.length;
        return (
            this.CardData ?
                (
                    <div className="InstructorCard-slider">
                        <div className="slider-btns">
                            <button className="slider-btn btn-l" onClick={() => this.handleClick('prev')}>&lt;</button>
                            <button className="slider-btn btn-r" onClick={() => this.handleClick('next')}>&gt;</button>
                        </div>

                        <Cards cardStyle={this.state.cardStyle} allInstructor={this.CardData}/>
                    </div>
                ) : null
        );
    }
}

const mapStateToProps = (state) => {
    const {instructor}  = state;
    return {
        instructor : instructor
    }
};

export default connect(mapStateToProps)(InstructorSlider);
