import './popularTopic.css';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';


class Cards extends Component {
    constructor(props){
        super(props);
        this.CardData = [];
    }
    addInArray = () => {
        let topicArray = [];
        let CardIndex = 0;
        const that = this;
        this.CardData = [...this.props.allTopic];
        for (let i=0;i<this.CardData.length;i=i+2){
            topicArray.push(
                <div className="TopicCard shadow-none" id="card" style={that.props.cardStyle} key={i}>
                    {/*<a href="#"><img src={card.course_Img} /></a>*/}
                    <p><Button className='btn-custom bg-transparent'>{this.CardData[i]}</Button></p>
                    {(i+1)< this.CardData.length ? (<p><Button className='bg-transparent'>{this.CardData[i+1]}</Button></p>) : null}</div>
            )
        }
        return topicArray;
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

class Ptopic extends Component {
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
            width: 0
        };
    }

    componentDidMount() {
        try{
            let boxWidth = document.getElementById("card").clientWidth;
            this.setState({ width: boxWidth });
            let nextClickCount = this.CardDataLength - 5;
            this.setState({
                nextClickCount:nextClickCount
            });
        }
        catch (e) {
            console.log("there is an error: ",e);
        }

    }
    // func: click the slider buttons
    handleClick(type) {
        const cardLimit = 5;
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
    addTopic = () => {
        let allTopic = [];
        try{
            this.props.categorydetail.Allcategory.map(function (category,index) {
                category.subcategory.map(function (category,index) {
                    if(category.subcategory.length > 0){
                        category.subcategory.map(function (subctgryname,index) {
                            allTopic.push(subctgryname.name);
                        })

                    }
                })
            })
            return allTopic;
        }
        catch (e) {
            console.log("there is an error: ",e);
        }

    }

    render() {
        this.CardData = this.addTopic();
        try {
            this.CardDataLength = Math.round(this.CardData.length/2);
        }
        catch (e) {
            console.log("there is an error: ",e);
        }
        let topic = [];
        topic = this.addTopic();
        return (
            this.CardData ?
                (
                    <div className="TopicCards-slider shadow-none slide-container">
                        <div className="slider-btns">
                            <button className="slider-btn btn-l" onClick={() => this.handleClick('prev')}>&lt;</button>
                            <button className="slider-btn btn-r" onClick={() => this.handleClick('next')}>&gt;</button>
                        </div>

                        <Cards cardStyle={this.state.cardStyle} allTopic={topic}/>
                    </div>
                ) : null
        );
    }
}

const mapStateToProps = (state) => {
    const { categorydetail}  = state;
    return {
        categorydetail : categorydetail
    }
};

export default connect(mapStateToProps)(Ptopic);
