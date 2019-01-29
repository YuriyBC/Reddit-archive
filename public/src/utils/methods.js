import axios from 'axios';

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

function generateRequestCancelToken() {
    const CancelToken = axios.CancelToken;
    return CancelToken.source();
}

function getDate(created) {
    if (created) {
        const date = new Date(+created * 1000);
        const month = date.getUTCMonth() + 1; // months from 1-12
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();

        const hours = date.getHours();
        const minutes = `0${date.getMinutes()}`;
        const seconds = `0${date.getSeconds()}`;
        return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)} ${day}/${month}/${year}`;
    }
    return false;
}

function reformatTextToLinks(text) {
    let string = text;
    const currentIndex = 0;
    let iteration = 0;

    function searchLink() {
        const indexOfReformatLink = string.indexOf('[', currentIndex);
        const linkText = string.slice(string.indexOf('[', indexOfReformatLink) + 1, string.indexOf(']', indexOfReformatLink));
        const linkUrl = string.slice(string.indexOf('(', indexOfReformatLink) + 1, string.indexOf(')', indexOfReformatLink));
        const url = `<a href="${linkUrl}">${linkText}<a/>`;

        string = string.replace(`[${linkText}](${linkUrl})`, url);
    }
    while (string.indexOf('[', currentIndex) > -1 && string[string.indexOf(']', currentIndex) + 1] === '(' && iteration < 100) {
        searchLink();
        iteration++;
    }

    return string;
}

function storage(...args) {
    if (args.length === 1) {
        return window.localStorage.getItem(args[0]);
    } if (args.length === 2) {
        return window.localStorage.setItem(args[0], args[1]);
    }
}

function reformatTextToBold(text) {
    let string = text;
    let currentIndex = 0;
    let iteration = 0;

    function searchBold() {
        const indexOfReformatBold = string.indexOf('**', currentIndex);
        if (indexOfReformatBold) {
            let boldItem = string.slice(string.indexOf('**', indexOfReformatBold), string.indexOf('**', indexOfReformatBold + 2));
            boldItem = boldItem.replace('**', '');
            const newBoldItem = `<b>${boldItem}</b>`;

            string = string.replace(`**${boldItem}**`, newBoldItem);
            currentIndex = string.indexOf(newBoldItem) + newBoldItem.length - 1;

            return string;
        }
    }

    while (string.indexOf('**', currentIndex) > -1 && iteration < 100) {
        searchBold();
        iteration++;
    }
    return string;
}

function reformatTextToHtml(text) {
    text = reformatTextToLinks(text);
    text = reformatTextToBold(text);
    return text;
}

function sortComments(comments) {
    comments.forEach((el) => {
        el.isSorted = false;
    });
    const originalArray = [...comments];
    const array = [...comments].filter(el => +el.depth === 0);

    const sortItems = () => {
        array.forEach((el) => {
            if (!el.isSorted) {
                const innerComments = originalArray.filter(comment => comment.parent_id === el.name);
                if (innerComments.length) {
                    el.isSorted = true;
                    array.splice(array.findIndex(a => el.name === a.name) + 1, 0, ...innerComments);
                }
            }
        });
    };

    while (true) {
        const areChildrenNotExists = array.every((el) => {
            const innerComments = originalArray.filter(comment => comment.parent_id === el.name);
            return !innerComments.length || el.isSorted;
        });
        if (areChildrenNotExists) {
            break;
        } else {
            sortItems();
        }
    }

    return array;
}

export default {
    throttle,
    getDate,
    reformatTextToHtml,
    storage,
    sortComments,
    generateRequestCancelToken,
};
