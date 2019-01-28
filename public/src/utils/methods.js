const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this
        const args = arguments
        if (!lastRan) {
            func.apply(context, args)
            lastRan = Date.now()
        } else {
            clearTimeout(lastFunc)
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args)
                    lastRan = Date.now()
                }
            }, limit - (Date.now() - lastRan))
        }
    }
};

function getDate (created) {
    if (created) {
        let date = new Date(+created * 1000);
        let month = date.getUTCMonth() + 1; //months from 1-12
        let day = date.getUTCDate();
        let year = date.getUTCFullYear();

        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)} ${day}/${month}/${year}`;
    }
    return false
}

function removeLinksFromText (message) {
    let text = message.slice(message.indexOf('['), message.indexOf(']') + 1);
    let link = message.slice(message.indexOf('('), message.indexOf(')') + 1);
    message = message.replace(text, '');
    message = message.replace(link, '');

    return message
}

function getLinksFromString (message) {
    let index = 0;
    let links = [];
    let string = message;

    function storeLink () {
        // if (string[string.indexOf(']', index) + 1] !== '(') {
        //
        // }
        let text = string.slice(string.indexOf('[', index) + 1, string.indexOf(']', index));
        let link = string.slice(string.indexOf('(', index) + 1, string.indexOf(')', index));
        index = string.indexOf(link) + link.length + 1;

        let x = '[' + text + ']';
        let y = '(' + link + ')';
        string = string.replace(x, '');
        string = string.replace(y, '');
        console.log(string)
        // string = string.replace('(' + link + ')', '');

        // console.log(string, string[string.indexOf('[', index)], string.indexOf('[', index))
        links.push({link, text});
        return links
    }

    storeLink()
    storeLink()
    // console.log(string)
    // console.log(message)
    // console.log(links)



    return {
        links,
        message
    }
}

function reformatTextToLinks (text) {
    let string = text;
    let currentIndex = 0;
    let iteration = 0;

    function searchLink () {
        let indexOfReformatLink = string.indexOf('[', currentIndex);
        let linkText = string.slice(string.indexOf('[', indexOfReformatLink) + 1, string.indexOf(']', indexOfReformatLink));
        let linkUrl = string.slice(string.indexOf('(', indexOfReformatLink) + 1, string.indexOf(')', indexOfReformatLink));
        let url = `<a href="${linkUrl}">${linkText}<a/>`;

        string = string.replace(`[${linkText}](${linkUrl})`, url);
    }
    while (string.indexOf('[', currentIndex) > -1 && string[string.indexOf(']', currentIndex) + 1] === '(' && iteration < 100) {
        searchLink();
        iteration++
    }

    return string
}

function storage (...args) {
    if (args.length === 1) {
        return window.localStorage.getItem(args[0])
    } else if (args.length === 2) {
        return window.localStorage.setItem(args[0], args[1])
    }
}

function reformatTextToBold (text) {
    let string = text;
    let currentIndex = 0;
    let iteration = 0;

    function searchBold () {
        let indexOfReformatBold = string.indexOf('**', currentIndex);
        if (indexOfReformatBold) {
            let boldItem = string.slice(string.indexOf('**', indexOfReformatBold), string.indexOf('**', indexOfReformatBold + 2));
            boldItem = boldItem.replace('**', '');
            const newBoldItem = `<b>${boldItem}</b>`;

            string = string.replace('**' + boldItem + '**', newBoldItem);
            currentIndex = string.indexOf(newBoldItem) + newBoldItem.length - 1;

            return string
        }
    }

    while (string.indexOf('**', currentIndex) > -1 && iteration < 100) {
        searchBold ();
        iteration++
    }
    return string

}

function reformatTextToHtml (text) {
    text = reformatTextToLinks(text);
    text = reformatTextToBold(text);
    return text
}



export default {
    throttle,
    getDate,
    reformatTextToHtml,
    storage
};