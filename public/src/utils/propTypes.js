import PropTypes from "prop-types";

export const subredditType = {
    icon_img: PropTypes.string,
    display_name: PropTypes.string,
    isLoading: PropTypes.bool,
    isArchived: PropTypes.number,
    banner_background_image: PropTypes.string,
    banner_background_color: PropTypes.string,
    key_color: PropTypes.string,
};

export const postType = {
    thumbnail: PropTypes.string,
    thumbnail_width: PropTypes.string,
    thumbnail_height: PropTypes.string,
    selftext: PropTypes.string,
    created: PropTypes.string,
    score: PropTypes.number,
    author_fullname: PropTypes.string,
    title: PropTypes.string,
    num_comments: PropTypes.number
};

export const commentType = {
    body: PropTypes.string,
    depth: PropTypes.string,
    created: PropTypes.string,
    author: PropTypes.string,
    score: PropTypes.string,
    id: PropTypes.number
};

export const errorMessagesType = PropTypes.arrayOf(PropTypes.string);