const initialState = [];

const subreddits = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SUBREDDITS':
            return action.payload;
    }
    return state
};

export default subreddits;