const initialState = {
    allPosts: [],
    currentPostInfo: {},
};

const posts = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...initialState,
                allPosts: action.payload,
            };
        case 'SET_POST_DATA':
            return {
                ...initialState,
                currentPostInfo: {
                    ...action.payload,
                    ...state.currentPostInfo,
                },
            };
        case 'SET_POST_COMMENTS':
            return {
                ...initialState,
                currentPostInfo: {
                    ...state.currentPostInfo,
                    ...action.payload,
                },
            };
        case 'REMOVE_POSTS':
            return initialState;
        default:
            return state;
    }
};

export default posts;
