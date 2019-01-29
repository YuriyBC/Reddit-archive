import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";

const ArchivedSubredditItem = (props) => {
    const getIcon = (subreddit) => {
        if (subreddit.icon_img) {
            return <img className="subreddit-icon" src={subreddit.icon_img} alt=""/>
        } else {
            return <FontAwesomeIcon className="subreddit-icon" icon={faBars}/>
        }
    };

    return <div>
        <Link onClick={props.removePosts}
              to={`/subreddit/${props.subreddit.id}`}>
            {getIcon(props.subreddit)}
            {props.subreddit.display_name}
        </Link>
        <span onClick={() => props.storeSubredditToArchive(props.subreddit.display_name)}>
            <FontAwesomeIcon icon={faTimes}/>
        </span>
    </div>

};

export default ArchivedSubredditItem;