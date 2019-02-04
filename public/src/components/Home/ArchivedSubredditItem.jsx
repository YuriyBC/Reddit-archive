import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { subredditType } from '../../utils/propTypes';

const ArchivedSubredditItem = (props) => {
    const { storeSubredditToArchive, removePosts, subreddit } = props;

    const getIcon = () => {
        if (subreddit.icon_img) {
            return <img className="subreddit-icon" src={subreddit.icon_img} alt="" />;
        }
        return <FontAwesomeIcon className="subreddit-icon" icon={faBars} />;
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            storeSubredditToArchive(subreddit.display_name);
        }
    };

    const getStyle = () => ({
        opacity: subreddit.isLoading ? 0.4 : 1,
        pointerEvents: subreddit.isLoading ? 'none' : 'auto',
        userSelect: subreddit.isLoading ? 'none' : 'auto',
    });

    return (
        <div style={getStyle()}>
            <Link onClick={removePosts} to={`/subreddit/${subreddit.id}`}>
                {getIcon()}
                {subreddit.display_name}
            </Link>
            <span onClick={() => storeSubredditToArchive(subreddit.display_name)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={handleKeyDown}
            >
                <FontAwesomeIcon icon={faTimes} />
            </span>
        </div>
    );
};

ArchivedSubredditItem.propTypes = {
    storeSubredditToArchive: PropTypes.func.isRequired,
    removePosts: PropTypes.func.isRequired,
    subreddit: PropTypes.shape(subredditType).isRequired,
};

export default ArchivedSubredditItem;
