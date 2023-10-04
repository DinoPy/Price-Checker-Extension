import { PERMITED_HOSTS } from '../../lib/helpers/constants.js';

/**
    * converts price from string to float;
    * @param {string} priceString Price in string format
    * @return {float}             Float format of the inputed price
*/
export const parsePrice = (priceString) => {
    let formatedString = priceString.slice(priceString.match(/\d/).index)
    if (formatedString.includes(','))
        return parseFloat(formatedString.replaceAll('.', '').replaceAll(',', '.'));
    return parseFloat(formatedString);
};

/**
    * Parses the prices, compares them and returns either the good or bad color
    * @param {string}  newPrice  New price
    * @param {string}  oldPrice  Old price
    * @param {string}  goodColor Color used to mark the positive return of the function. Can be any color format.
    * @param {string}  badColor  Color used to mark the negative return of the function. Can be any color format.
    * @return {string}          Based on if a difference is existent the good or bad color is returned.
*/
export const comparePrice = (newPrice, oldPrice, goodColor, badColor) => {
    if (newPrice === null || oldPrice === null) return "";
    const newPriceFloat = parsePrice(newPrice);
    const oldPriceFloat = parsePrice(oldPrice);

    if (newPriceFloat === oldPriceFloat) return '';
    if (newPriceFloat < oldPriceFloat) return goodColor;
    if (newPriceFloat > oldPriceFloat) return badColor;
};

/**
    * Parses the title into a shorter format if needed.
    * @param {string} title Title string that will be parsed
    * @return {string}      Parsed version of the title
*/
export const parseTitle = (title) => {
    let splitTitle = title.split(' ');
    if (splitTitle.length <= 12) return title;
    let newTitle = splitTitle.splice(0, 12).join(' ') + '...';
    return newTitle;
}

export const parseUrl = (URL, input) => {
    try {
        if (typeof window !== 'undefined') return new window.URL(URL);
    } catch {
        input.setCustomValidity('Invalid URL');
        input.reportValidity();
        return null;
    }
};

export const checkURLEligibility = (urlObj, input) => {
    let isURLEligible = false;
    for (let i = 0; i < PERMITED_HOSTS.length; i++) {
        if (urlObj.host === PERMITED_HOSTS[i].host) {
            isURLEligible = true;
        }
    }
    if (!isURLEligible) {
        input.setCustomValidity(`Only allowed ${PERMITED_HOSTS.map(p => p.name).join(", ")}`);
        input.reportValidity();
    }
    return isURLEligible;
};

export const isDuplicate = (URL, input, links) => {
    for (let i of links) {
        if (i.includes(URL.trim())) {
            input.setCustomValidity('Duplicate URL');
            input.reportValidity();
            return true;
        }
    }
    return false;
};
