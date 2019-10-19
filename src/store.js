import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/index';

const composeEnhance = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhance(
    applyMiddleware(thunk)
);
const CategoryData = localStorage.getItem("Category");
const CourseData = localStorage.getItem("Courses");
const topicData = localStorage.getItem("topic");
const InstructorData = localStorage.getItem("Instructor");
const registerUser = localStorage.getItem("LoginUser");
const cartData = localStorage.getItem("addToCart");
const INITIAL_STATE = {
    categorydetail: {
        Allcategory: {}
    },
    courses: {
        AllCourses: {}
    },
    filterTopic: {
        filterTopic: []
    },
    instructor:{
        AllInstructor: {}
    },
    userRegisterLog:{
        userDetail:{}
    },
    userCartItem:{
        cartItem:[]
    }
};
if(CategoryData && CourseData && InstructorData)
    INITIAL_STATE.categorydetail.Allcategory=JSON.parse(CategoryData);
    INITIAL_STATE.courses.AllCourses = JSON.parse(CourseData);
    INITIAL_STATE.filterTopic.filterTopic = JSON.parse(topicData);
    INITIAL_STATE.instructor.AllInstructor = JSON.parse(InstructorData);
    INITIAL_STATE.userRegisterLog.userDetail = JSON.parse(registerUser);
    INITIAL_STATE.userCartItem.cartItem = JSON.parse(cartData);
export default createStore( rootReducer,INITIAL_STATE,enhancer);
