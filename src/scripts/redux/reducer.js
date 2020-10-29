/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case 'ALL_STORIES': {
            return { ...state, stories: payload };
        }
        case 'ERROR_HANDLER': {
            return { ...state, errorMessage: payload };
        }
        default: {
            return {
                ...state,
                payload
            };
        }
    }
};
