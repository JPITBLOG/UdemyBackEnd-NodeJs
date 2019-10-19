const INITIAL_STATE = {
    filterTopic: {}
};
export const TOPIC_INSERTED_SUCCESSFULLY = "TOPIC_INSERTED_SUCCESSFULLY";
export const ERROR_IN_INSERT_TOPIC = "ERROR_IN_INSERT_TOPIC";
export const TOPIC_REMOVE_SUCCESSFULLY = "TOPIC_REMOVE_SUCCESSFULLY";

export default (state = INITIAL_STATE,action) => {
    switch (action.type){
        case TOPIC_INSERTED_SUCCESSFULLY:{
            return Object.assign({},state,{...state,filterTopic:action.data});
        }
        case ERROR_IN_INSERT_TOPIC:{
            return Object.assign({},state,{error_msg:action.data.error_message});
        }
        case TOPIC_REMOVE_SUCCESSFULLY:{
            return Object.assign({},state,{filterTopic:action.data})
        }
        default:
            return state;
    }
}