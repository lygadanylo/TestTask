import axios from 'axios';
import { TOPSTORIES, STORIEINFO, AUTHORINFO, STORYNUMBER } from '../static/variables';

export const AllStoriesInfo = (data) => ({
    type: 'ALL_STORIES',
    payload: data
});

export const ErrorHandler = (data) => ({
    type: 'ERROR_HANDLER',
    payload: data
});

export const sortingScore = (data, sortType) => (dispatch) => {
    if (sortType) {
        data.sort((a, b) => {
            if (a.score > b.score) {
                return 1;
            }
            if (a.score < b.score) {
                return -1;
            }
            return 0;
        });
    } else {
        data.sort((a, b) => {
            if (a.score < b.score) {
                return 1;
            }
            if (a.score > b.score) {
                return -1;
            }
            return 0;
        });
    }

    dispatch(AllStoriesInfo(data));
};

export const sortingKarma = (data, sortType) => (dispatch) => {
    if (sortType) {
        data.sort((a, b) => {
            if (a.karma > b.karma) {
                return 1;
            }
            if (a.karma < b.karma) {
                return -1;
            }
            return 0;
        });
    } else {
        data.sort((a, b) => {
            if (a.karma < b.karma) {
                return 1;
            }
            if (a.karma > b.karma) {
                return -1;
            }
            return 0;
        });
    }

    dispatch(AllStoriesInfo(data));
};

export const GetAllStories = () => (dispatch) => {
    const arrayStory = [];
    let storyCounter = STORYNUMBER;
    axios({
        method: 'GET',
        url: TOPSTORIES
    })
        .then((response) => {
            while (storyCounter) {
                const item = response.data[Math.floor(Math.random() * response.data.length)];
                dispatch(GetStoryInfo(item, arrayStory));
                storyCounter--;
            }
        })
        .catch((error) => {
            if (error.response.data) {
                dispatch(ErrorHandler(error.response.data));
            } else {
                dispatch(ErrorHandler({ msg: 'Sorry. Problem with server...' }));
            }
        });
};

export const GetStoryInfo = (item, arrayStory) => (dispatch) => {
    axios({
        method: 'GET',
        url: STORIEINFO.URL + item + STORIEINFO.FORMAT
    })
        .then((response) => {
            arrayStory.push(response.data);
            dispatch(GetAuthorInfo(arrayStory));
        })
        .catch((error) => {
            if (error.response.data) {
                dispatch(ErrorHandler(error.response.data));
            } else {
                dispatch(ErrorHandler({ msg: 'Sorry. Problem with server...' }));
            }
        });
};

export const GetAuthorInfo = (arrayStory) => (dispatch) => {
    const arrayAllInfo = [];
    arrayStory.forEach((elem) => {
        axios({
            method: 'GET',
            url: AUTHORINFO.URL + elem.by + AUTHORINFO.FORMAT
        })
            .then((response) => {
                const allInfo = new Object({ ...elem, ...response.data });
                arrayAllInfo.push(allInfo);
                if (arrayAllInfo.length === STORYNUMBER) {
                    dispatch(AllStoriesInfo(arrayAllInfo));
                }
            })
            .catch((error) => {
                if (error.response.data) {
                    dispatch(ErrorHandler(error.response.data));
                } else {
                    dispatch(ErrorHandler({ msg: 'Sorry. Problem with server...' }));
                }
            });
    });
};
