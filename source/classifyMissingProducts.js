function classifyMissingProducts(data, startWeek, endWeek) {
    
    let {stockedWeekCount, firstStockedWeek, lastStockedWeek} = buildStockHistoryRef(data, startWeek, endWeek);
    
    let storeProductCombos = Object.keys(stockedWeekCount);

    let missingProductList = ['store_id,product_id,status'];

    storeProductCombos.forEach(key => {
        if (stockedWeekCount[key] === (endWeek - firstStockedWeek[key] + 1)) return; // This product has been stocked ever since it was first stocked all the way to endWeek.

        if (stockedWeekCount[key] !== (lastStockedWeek[key] - firstStockedWeek[key] + 1)) { //This product has been missing before and returned to the store.
            return missingProductList.push(`${key.replace(/\|/, ',')},OUT_OF_STOCK`);
        }

        return missingProductList.push(`${key.replace(/\|/, ',')},REMOVED`) // This product was stocked until it disappeared.
    });
    
    return missingProductList;
}

function buildStockHistoryRef(data, startWeek, endWeek) {
    return data.slice(1).reduce((ref, row) => {
        let [week, storeId, productId] = row.split(',');
        week = Number(week);
        storeId = Number(storeId);

        if (week < startWeek || week > endWeek) {
            return ref;
        }

        if (!ref.stockedWeekCount[`${storeId}|${productId}`]) {
            ref.stockedWeekCount[`${storeId}|${productId}`] = 0
        }
        ref.stockedWeekCount[`${storeId}|${productId}`]++;

        if (
            !ref.firstStockedWeek[`${storeId}|${productId}`] 
            || ref.firstStockedWeek[`${storeId}|${productId}`] > week
            && week < endWeek
        ) {
            ref.firstStockedWeek[`${storeId}|${productId}`] = week;
        }
        if (
            !ref.lastStockedWeek[`${storeId}|${productId}`] 
            || ref.lastStockedWeek[`${storeId}|${productId}`] < week
            && week > startWeek
        ) {
            ref.lastStockedWeek[`${storeId}|${productId}`] = week;
        }

        return ref;

    }, {
        firstStockedWeek: {},
        lastStockedWeek: {},
        stockedWeekCount: {},
    });
}

module.exports = {
    classifyMissingProducts,
    buildStockHistoryRef
}