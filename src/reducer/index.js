import {combineReducers} from 'redux';
import categorydetail from './categorydetail';
import courses from './courses';
import filterTopic from './filterTopic';
import instructor from './instructor';
import userRegisterLog from './userRegisterLog';
import userCartItem from './userCartItem';
import subCategory from './subCategory';
import addCourse from './addCourse';
import addInstructor from './addInstructor';

export default combineReducers({categorydetail,courses,filterTopic,instructor,userRegisterLog,userCartItem,subCategory
,addCourse,addInstructor});
