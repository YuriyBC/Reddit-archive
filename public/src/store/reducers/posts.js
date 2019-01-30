const initialState = {
    allPosts: [],
    currentPost: {},
    currentComments: []
};

const posts = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                allPosts: action.payload,
            };
        case 'SET_POST_DATA':
            return {
                ...state,
                currentPost: action.payload.data
            };
        case 'SET_POST_COMMENTS':
            console.log(action.payload)
            return {
                ...state,
                currentComments: action.payload.comments
            };
        case 'REMOVE_POSTS':
            return initialState;
        default:
            return state;
    }
};

export default posts;
