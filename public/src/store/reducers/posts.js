const initialState = [];

const posts = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return action.payload;
    }
    return state
};

export default posts;