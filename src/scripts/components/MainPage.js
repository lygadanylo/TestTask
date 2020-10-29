import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { GetAllStories, sortingScore, sortingKarma } from '../redux/actions';

export const MainPage = () => {
    const dispatch = useDispatch();

    const stories = useSelector((state) => state.stories, shallowEqual());
    const errorMessage = useSelector((state) => state.errorMessage, shallowEqual());
    const [ sortType, setSortType ] = useState(false);

    useEffect(() => {
        dispatch(GetAllStories());
    }, []);

    const parseDate = (time) => {
        const dateObj = new Date(time * 1000);
        const utcString = dateObj.toUTCString();
        const parsedTime = utcString.slice(-11, -4);
        return parsedTime;
    };

    const handlerSortButton = (props) => {
        const { stories, by } = props;
        if (by.toLowerCase === 'score') {
            dispatch(sortingScore(stories, sortType));
        } else {
            dispatch(sortingKarma(stories, sortType));
        }
    };

    return (
        <Fragment>
            {stories ? (
                <div>
                    <div className="stories">
                        {stories.map((elem, index) => {
                            return (
                                <ul className="stories__item" key={index}>
                                    <li>
                                        <lable id="form-field">Title:</lable>"{elem.title}"
                                    </li>
                                    <li>
                                        <lable id="form-field">Type:</lable> {elem.type}
                                    </li>
                                    <li>
                                        <label id="form-field">Author:</label> {elem.by}
                                    </li>
                                    <li>
                                        <label id="form-field">Score: </label>
                                        {elem.score}
                                    </li>
                                    <li>
                                        <label id="form-field">Author Karma: </label>
                                        {elem.karma}
                                    </li>
                                    <li id="form_footer">
                                        <label id="form-field">Created:</label> {parseDate(elem.time)}
                                        <a href={elem.url}>Go to post</a>
                                    </li>
                                </ul>
                            );
                        })}
                    </div>
                    <button
                        className="sort-button"
                        onClick={() => {
                            setSortType((prev) => !prev);
                            handlerSortButton({ stories, by: 'score' });
                        }}
                    >
                        Sort by score
                    </button>
                    <button
                        className="sort-button sort-author"
                        onClick={() => {
                            setSortType((prev) => !prev);
                            handlerSortButton({ stories, by: 'authorKarma' });
                        }}
                    >
                        Sort by Author Karma
                    </button>
                </div>
            ) : (
                <Fragment>
                    {errorMessage ? (
                        <h1>{errorMessage.msg}</h1>
                    ) : (
                        <h1>Getting data from the server. Please wait ...</h1>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};
