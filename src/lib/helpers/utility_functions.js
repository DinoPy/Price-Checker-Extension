/**
    * converts price from string to float;
    * @param {string} priceString Price in string format
    * @return {float}             Float format of the inputed price
*/
export const parsePrice = (priceString) => {
    return parseFloat(priceString.replaceAll('.', '').replaceAll(',','.'));
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


