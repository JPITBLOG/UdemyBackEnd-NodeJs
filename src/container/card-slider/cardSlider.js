import '../card-slider/cardSlider.css';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Cards from '../courses/Course';

class Disp extends Component {
    constructor(props) {
        super(props);
        this.CardData = [];
        this.CardDataLength = 0;
        this.state = {
            currentCard: 0,
            position: 0,
            cardStyle: {
                transform: 'translateX(0px)'
            },
            width: 0,
            cardLimit:0,
            nextClickCount: 5,
            topic:null
        };
    }

    addInArray = () => {
        let AllTopic = [];
        let tempArray = [];
        let selectedTopic = [];
        const that = this;

        this.props.categorydetail.Allcategory.map(function (category,index) {
                tempArray = [];
                category.subcategory.map(function (subcategory,index) {
                    if(subcategory.subcategory !== [] && subcategory.subcategory.length > 0){
                        subcategory.subcategory.map(function (subTopic,index){
                            tempArray.push(subTopic.name);
                        });
                    }
                });
                category.subcategory.map(function (subcategory,index) {

                    if(subcategory.name === that.props.topic){
                        AllTopic = tempArray.slice(0);
                    }
                    else if(subcategory.subcategory !== [] && subcategory.subcategory.length > 0){
                        tempArray = subcategory.subcategory;
                        subcategory.subcategory.map(function (subTopic,index){

                                if(that.props.topic === subTopic.name){
                                    AllTopic = [];
                                    if(that.props.topic.slice(0,3) === 'All'){
                                        AllTopic = tempArray.slice(0);
                                    }
                                    else {
                                        AllTopic.push(subTopic.name);

                                    }
                                }
                        })
                    }
                })
        });
            that.CardData = [];
            let CardIndex = 0;
             AllTopic.map(function (topic,index) {
                 if(typeof topic === "object") {
                     selectedTopic.push(topic.name)
                     localStorage.setItem("selectedTopic", JSON.stringify(selectedTopic))
                     that.props.courses.AllCourses.map(function (course, index) {

                         if (topic.name === course.category_Name) {
                             that.CardData[CardIndex] = course;
                             CardIndex = CardIndex + 1;
                         }
                     });
                 }
                 else{
                     selectedTopic.push(topic)
                     localStorage.setItem("selectedTopic", JSON.stringify(selectedTopic))
                     that.props.courses.AllCourses.map(function (course, index) {
                             if (topic === course.category_Name) {
                                 that.CardData[CardIndex] = course;
                                 CardIndex = CardIndex + 1;
                             }
                     });

                 }

             })
        if(this.props.topic !== this.state.topic){
            let nextClickCount = this.CardData.length - 5;
            this.setState({
                topic:this.props.topic,
                nextClickCount:nextClickCount
            });
        }
    };

    componentDidMount() {
        this.CardDataLength = this.CardData.length;
        let nextClickCount = this.CardDataLength - 5;
        let boxWidth;
        try {
            boxWidth = 220;
            // document.getElementById("card").clientWidth;
        }
        catch (e) {
            boxWidth = 0;
        }
        this.setState({width:boxWidth,nextClickCount:nextClickCount,currentCard: 0,
            position: 0,cardLimit: 5});
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
            this.addInArray();
            this.setState({
                width: boxWidth,
                currentCard: 0,
                position: 0,
                cardStyle: {
                    transform: 'translateX(0px)'
                },
                nextClickCount:this.CardData ? this.CardData.length - 5 : 0,
                cardLimit:5
            });
        }
    }

    handleClick(type) {
        let margin = window.getComputedStyle(document.getElementById("card")).marginRight;
        margin = JSON.parse(margin.replace(/px/i, ''));

        const cardLimit = 5;
        const cardWidth = document.getElementById("card").clientWidth; // the card's width
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
        let cardData = this.CardData;
        return (
            this.CardData ?
                (
                    <div className="cards-slider">
                        <div className="slider-btns">
                            <button className="slider-btn btn-l" onClick={() => this.handleClick('prev')}>&lt;</button>
                            <button className="slider-btn btn-r" onClick={() => this.handleClick('next')}>&gt;</button>
                        </div>
                            <Cards cardStyle={this.state.cardStyle} cardData = {cardData} courses = {this.props.courses} topic = {this.props.topic} categorydetail = {this.props.categorydetail}/>
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

export default connect(mapStateToProps)(Disp);
