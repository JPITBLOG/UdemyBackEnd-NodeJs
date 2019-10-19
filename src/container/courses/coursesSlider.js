import '../card-slider/cardSlider.css';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Cards from './Course';

class Disp extends Component {
    constructor(props) {
        super(props);
        this.CardData = [];
        this.state = {
            currentCard: 0,
            position: 0,
            cardStyle: {
                transform: 'translateX(0px)'
            },
            width: 0,
            nextClickCount: 0,
            cardLimit: 0,
            topic:null
        };
    }

    addInArray = () => {
        let CardIndex = 0;
        let AllTopic = [];
        let AllTopicIndex = 0;
        const that = this;

        if(this.props.topic !== this.state.topic){
            this.setState({
                topic:this.props.topic
            });
        }
        let topic = this.props.topic;
        try{
            this.props.categorydetail.Allcategory.map(function (category,index) {
                if(category.name === topic) {
                    category.subcategory.map(function (subcategory,index) {
                        if(subcategory.subcategory !== [] && subcategory.subcategory.length > 0){
                            subcategory.subcategory.map(function (subTopic,index){
                                AllTopic[AllTopicIndex] = subTopic.name;
                                AllTopicIndex++;
                            })
                        }
                    })
                }

                else {
                    category.subcategory.map(function (subcategory,index) {
                        if(topic === subcategory.name){
                            subcategory.subcategory.map(function (subTopic,index){
                                AllTopic[AllTopicIndex] = subTopic.name;
                                AllTopicIndex++;
                            })
                        }
                    })

                }
            });

            this.props.courses.AllCourses.map(function (course,index){
                AllTopic.map(function (topic,index) {
                    if(topic === course.category_Name){
                        that.CardData[CardIndex] = course;
                        CardIndex = CardIndex+1;
                    }
                })
            });

        }
        catch (e) {
            console.log("there is an error :",e);
        }


    };

    componentDidMount() {
        let boxWidth;
        try {
            boxWidth = 220;
        }
        catch (e) {
            boxWidth = 0;
        }
        this.setState({ width: boxWidth ,currentCard: 0,
            position: 0,cardLimit: 5});
        let nextClickCount = this.CardData.length - 5;
        this.setState({
            nextClickCount:nextClickCount
        });
    }

    componentDidUpdate(){
        if(this.props.topic !== this.state.topic) {
            let boxWidth;
            try {
                boxWidth = document.getElementById("card").clientWidth;
            }
            catch (e) {
                boxWidth = 0;
            }
            this.CardData = [];
            this.addInArray();
            this.setState({
                width: boxWidth,
                currentCard: 0,
                position: 0,
                cardStyle: {
                    transform: 'translateX(0px)'
                },
                nextClickCount:this.CardData ? this.CardData.length - 5 : 0,
                cardLimit: 5
            });
        }
    }

    handleClick(type) {
        let margin = window.getComputedStyle(document.getElementById("card")).marginRight;
        margin = JSON.parse(margin.replace(/px/i, ''));

        const cardLimit = 5;
        const cardWidth = this.state.width; // the card's width
        const cardMargin = margin; // the card's margin
        const cardNumber = this.CardData.length; // the number of cards
        let currentCard = this.state.currentCard; // the index of the current card
        let position = this.state.position; // the position of the cards
        if(cardLimit <cardNumber){
            if(type === 'next' && currentCard < cardNumber-1 && this.state.nextClickCount >0) {
                currentCard++;
                this.setState({nextClickCount:this.state.nextClickCount-1});
                position -= (cardWidth+cardMargin);
            } else if(type === 'prev' && currentCard > 0) {
                currentCard--;
                this.setState({nextClickCount:this.state.nextClickCount+1});
                position += (cardWidth+cardMargin);
            }
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

    render() {
        this.addInArray();
        const cardData = this.CardData;
        return (
            this.CardData ?
                (
                    <div className="cards-slider">
                        <div className="slider-btns">
                            <button className="slider-btn btn-l" onClick={() => this.handleClick('prev')}>&lt;</button>
                            <button className="slider-btn btn-r" onClick={() => this.handleClick('next')}>&gt;</button>
                        </div>
                        <Cards getboxWidth = {this.getboxWidth}  cardStyle={this.state.cardStyle} cardData = {cardData} courses = {this.props.courses} topic = {this.props.topic} categorydetail = {this.props.categorydetail}/>
                    </div>
                )
                :<h3>Data is not available</h3>
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

export default connect(mapStateToProps,null)(Disp);
