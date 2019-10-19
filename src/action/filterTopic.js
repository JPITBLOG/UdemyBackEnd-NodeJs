import {TOPIC_INSERTED_SUCCESSFULLY,ERROR_IN_INSERT_TOPIC,TOPIC_REMOVE_SUCCESSFULLY} from '../reducer/filterTopic';
export const addfilteredTopic = (topic,value) => {
    let topicStorage = [];
    return (dispatch) => {
        try {
            if(localStorage.getItem(topic) !== null){
                topicStorage = JSON.parse(localStorage.getItem(topic));
            }
            topicStorage.push(value);
            localStorage.setItem(topic, JSON.stringify(topicStorage));

            dispatch({
                type:TOPIC_INSERTED_SUCCESSFULLY,
                data:topicStorage
            });
            topicStorage = [];
        }
        catch (e) {
            dispatch({
                type:ERROR_IN_INSERT_TOPIC,
                data:{error_message:e.toString()}
            });
        }

    }
};
export const removefilteredTopic = (topic,value) => {
    let topicStorage = [];
    return (dispatch) => {
        try {
            if(localStorage.getItem(topic) !== null){
                topicStorage = JSON.parse(localStorage.getItem(topic));
            }
            topicStorage.splice(topicStorage.indexOf(value),1);
            localStorage.setItem(topic, JSON.stringify(topicStorage));
            dispatch({
                type:TOPIC_REMOVE_SUCCESSFULLY,
                data:topicStorage
            });
            topicStorage = [];
        }
        catch (e) {
            dispatch({
                type:ERROR_IN_INSERT_TOPIC,
                data:{error_message:e.toString()}
            });
        }

    }
};
