import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFire,
    faCertificate,
    faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import triangle from '../../assets/svg/triangle.svg';
import constants from '../../utils/constants';

const { AVAILABLE_SORTING } = constants;

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
        this.renderSorting = this.renderSorting.bind(this);
        this.renderDropdown = this.renderDropdown.bind(this);
        this.renderDropdownStyle = this.renderDropdownStyle.bind(this);
        this.getSortTitleStyle = this.getSortTitleStyle.bind(this);
    }

    getSortTitleStyle() {
        const { isDataLoaded } = this.props;
        return {
            display: isDataLoaded() ? 'flex' : 'none',
        };
    }

    changeSorting(sortingType) {
        const { changeSorting } = this.props;
        changeSorting(sortingType.id);
        this.setState({
            isDropdownContentVisible: false,
        });
    }

    toggleDropdown() {
        const { isDropdownContentVisible } = this.state;
        this.setState({
            isDropdownContentVisible: !isDropdownContentVisible,
        });
    }

    renderSorting() {
        const { availableSorting, icons } = this;
        const { isDataLoaded, currentSortingId } = this.props;
        const currentSorting = availableSorting.find(sorting => sorting.id === currentSortingId);
        if (currentSorting && isDataLoaded()) {
            return (
                <div
                    className="subreddit-navbar__dropdown-chosen"
                    role="button"
                    tabIndex={0}
                    onClick={this.toggleDropdown}
                >
                    <FontAwesomeIcon icon={icons[currentSorting.icon]} />
                    <span>{currentSorting.title}</span>
                    <img src={triangle} alt="dropdown-triangle" />
                </div>
            );
        }
        return null;
    }

    renderDropdown() {
        const dropdownContent = [...this.availableSorting].map((dropdownItem, index) => (
            <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => this.changeSorting(dropdownItem)}
            >
                <div className="icon-wrapper">
                    <FontAwesomeIcon icon={this.icons[dropdownItem.icon]} />
                </div>
                <span>{dropdownItem.title}</span>
            </div>
        ));
        return (
            <div
                style={this.renderDropdownStyle()}
                className="subreddit-navbar__dropdown"
            >
                {dropdownContent}
            </div>
        );
    }

    renderDropdownStyle() {
        const { isDropdownContentVisible } = this.state;
        return {
            display: isDropdownContentVisible ? 'flex' : 'none',
        };
    }

    render() {
        return (
            <div className="subreddit-navbar">
                <div className="subreddit-navbar__buttons">
                    <div className="subreddit-navbar__sorting">
                        <h5 style={this.getSortTitleStyle()}>SORT</h5>
                        <div className="subreddit-navbar__dropdown-container">
                            {this.renderSorting()}
                            {this.renderDropdown()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NavigationBar.propTypes = {
    changeSorting: PropTypes.func.isRequired,
    isDataLoaded: PropTypes.func.isRequired,
    currentSortingId: PropTypes.number.isRequired,
};
