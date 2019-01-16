const initialState = [{
    id: 0,
    title: 'Stuff To Try (this is a list)',
    cards: []
}];

const subreddits = (state = initialState, action) => {
    switch (action.type) {
        case 'ACTION':
            return [
                ...state
            ];
    }
    return state
};

export default subreddits;