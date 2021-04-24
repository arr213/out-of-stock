module.exports = {

    dataInput1: [
        'week,store_id,product_id',
    ],
    expectedHistoryRef1: {
        firstStockedWeek: {},
        lastStockedWeek: {},
        stockedWeekCount: {}
    },
    dataInput2:[
        'week,store_id,product_id',
        '202001,1001,065633412026',
        '202011,1001,065633412026',
        '202020,1001,065633412026',
        '202002,1001,016000449770',
        '202010,1001,016000449770',
        '202012,1001,016000449770',
    ],
    expectedHistoryRef2: {
        firstStockedWeek: {
            "1001|016000449770": 202010,
            "1001|065633412026": 202011
        },
        lastStockedWeek: {
            "1001|016000449770": 202012,
            "1001|065633412026": 202011
        },
        stockedWeekCount: {
            "1001|016000449770": 2,
            "1001|065633412026": 1
        }
    },
    dataInput3:[
        'week,store_id,product_id',
        // Always in stock
        '202001,1001,065633412026',
        '202002,1001,065633412026',
        '202003,1001,065633412026',
        // Removed
        '202001,1001,016000449770',
        '202002,1001,016000449770',
        // Always in stock (once it first appeared)
        '202002,1002,065633412026',
        '202003,1002,065633412026',
        // Out of Stock
        '202001,1002,016000449770',
        '202003,1002,016000449770',
    ],
    expectedProducts3: [
        'store_id,product_id,status',
        '1001,016000449770,REMOVED',
        '1002,016000449770,OUT_OF_STOCK',
    ],

};
