import React from 'react';
import constants from '../../utils/constants'
const { AVAILABLE_SORTING } = constants;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFire,
    faCertificate,
    faChartLine
} from "@fortawesome/free-solid-svg-icons";
import triangle from '../../assets/svg/triangle.svg'

export default class NavigationBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isDropdownContentVisible: false
        };
        this.icons = {
            faFire: faFire,
            faCertificate: faCertificate,
            faChartLine: faChartLine
        };
        this.availableSorting = AVAILABLE_SORTING;
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.changeSorting = this.changeSorting.bind(this);
    }

    toggleDropdown () {
        this.setState({
            isDropdownContentVisible: !this.state.isDropdownContentVisible
        })
    }

    getCurrentSorting () {
        let currentSorting = this.availableSorting.find(sorting => sorting.id === this.props.currentSortingId)
        if (currentSorting) {
            return <div className="subreddit-navbar__dropdown-chosen"
                        onClick={this.toggleDropdown}>
                <FontAwesomeIcon icon={this.icons[currentSorting.icon]}/>
                <span>{currentSorting.title}</span>
                <img src={triangle} alt="dropdown-triangle"/>
            </div>
        }
        return null
    }

    getDropdownStyle () {
        return {
            'display': this.state.isDropdownContentVisible ? 'flex' : 'none'
        }
    }

    changeSorting (sortingType) {
        this.props.changeSorting(sortingType.id);
        this.setState({
            isDropdownContentVisible: false
        });
    }

    getDropdown () {
        const dropdownContent = [...this.availableSorting].map((dropdownItem, index) => {
            return <div key={index}
                        onClick={() => this.changeSorting(dropdownItem)}>
                <div className="icon-wrapper">
                    <FontAwesomeIcon icon={this.icons[dropdownItem.icon]}/>
                </div>
                <span>{dropdownItem.title}</span>
            </div>
        });
        return <div style={this.getDropdownStyle.call(this)}
                    className="subreddit-navbar__dropdown">
            {dropdownContent}
        </div>
    }

    render () {
        return <div className="subreddit-navbar">
            <div className="subreddit-navbar__buttons">
                <div className="subreddit-navbar__sorting">
                    <h5>SORT</h5>
                    <div className="subreddit-navbar__dropdown-container">
                        {this.getCurrentSorting.call(this)}
                        {this.getDropdown.call(this)}
                    </div>
                </div>
            </div>
        </div>
    }

}
