const initialState = {
    subreddits: [],
    errorMessages: []
};

const subreddits = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SUBREDDITS':
            return {
                errorMessages: state.errorMessages,
                subreddits: action.payload
            };
        case 'SET_ERROR_MESSAGE':
            return {
                subreddits: state.subreddits,
                errorMessages: action.payload
            }
    }
    return state
};

export default subreddits;