import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faFire,
    faCertificate,
    faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import triangle from '../../assets/svg/triangle.svg';
import constants from '../../utils/constants';

const {AVAILABLE_SORTING} = constants;
export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdownContentVisible: false,
        };
        this.icons = {
            faFire,
            faCertificate,
            faChartLine,
        };
        this.availableSorting = AVAILABLE_SORTING;
        this.changeSorting = this.changeSorting.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    getCurrentSorting() {
        const {availableSorting, icons} = this;
        const {isDataLoaded, currentSortingId} = this.props;
        const currentSorting = availableSorting.find(sorting => sorting.id === currentSortingId);
        if (currentSorting && isDataLoaded()) {
            return (
                <div
                    className="subreddit-navbar__dropdown-chosen"
                    role="button"
                    tabIndex={0}
                    onClick={this.toggleDropdown}
                >
                    <FontAwesomeIcon icon={icons[currentSorting.icon]}/>
                    <span>{currentSorting.title}</span>
                    <img src={triangle} alt="dropdown-triangle"/>
                </div>
            );
        }
        return null;
    }

    getDropdownStyle() {
        const {isDropdownContentVisible} = this.state;
        return {
            display: isDropdownContentVisible ? 'flex' : 'none',
        };
    }

    getSortTitleStyle() {
        const {isDataLoaded} = this.props;
        return {
            display: isDataLoaded() ? 'flex' : 'none',
        };
    }

    getDropdown() {
        const dropdownContent = [...this.availableSorting].map((dropdownItem, index) => (
            <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => this.changeSorting(dropdownItem)}
            >
                <div className="icon-wrapper">
                    <FontAwesomeIcon icon={this.icons[dropdownItem.icon]}/>
                </div>
                <span>{dropdownItem.title}</span>
            </div>
        ));
        return (
            <div
                style={this.getDropdownStyle.call(this)}
                className="subreddit-navbar__dropdown"
            >
                {dropdownContent}
            </div>
        );
    }

    changeSorting(sortingType) {
        const {changeSorting} = this.props;
        changeSorting(sortingType.id);
        this.setState({
            isDropdownContentVisible: false,
        });
    }

    toggleDropdown() {
        const {isDropdownContentVisible} = this.state;
        this.setState({
            isDropdownContentVisible: !isDropdownContentVisible,
        });
    }

    render() {
        return (
            <div className="subreddit-navbar">
                <div className="subreddit-navbar__buttons">
                    <div className="subreddit-navbar__sorting">
                        <h5 style={this.getSortTitleStyle.call(this)}>SORT</h5>
                        <div className="subreddit-navbar__dropdown-container">
                            {this.getCurrentSorting.call(this)}
                            {this.getDropdown.call(this)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
