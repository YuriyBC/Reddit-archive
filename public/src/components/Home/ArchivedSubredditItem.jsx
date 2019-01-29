import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

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

    return (
        <div>
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

export default ArchivedSubredditItem;
