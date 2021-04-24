const mocha = require('mocha');
const expect = require('chai').expect;
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { buildStockHistoryRef, classifyMissingProducts } = require('../source/utils');
const testData = require('./test_data');

describe('Out-Of-Stock', function(){

    describe('Unit Tests', function() {
        describe('buildStockHistoryRef: helper function to build ', function() {
            it('is a function', function() {
                expect(buildStockHistoryRef).to.be.a('function');
            });

            it('returns an object with 3-dictionaries', function(){
                let obj = buildStockHistoryRef(testData.dataInput1, 202001, 202101);
                expect(obj).to.eql(testData.expectedHistoryRef1);
            });

            it('stores the first week of seeing each product in each store within the date range', function(){
                let obj = buildStockHistoryRef(testData.dataInput2, 202005, 202015);
                expect(obj.firstStockedWeek).to.eql(testData.expectedHistoryRef2.firstStockedWeek);
            });
            it('stores the last week of seeing each product in each store within the date range', function(){
                let obj = buildStockHistoryRef(testData.dataInput2, 202005, 202015);
                expect(obj.lastStockedWeek).to.eql(testData.expectedHistoryRef2.lastStockedWeek);
            });
            it('stores the number of weeks seeing each product in each store within the date range', function(){
                let obj = buildStockHistoryRef(testData.dataInput2, 202005, 202015);
                expect(obj.stockedWeekCount).to.eql(testData.expectedHistoryRef2.stockedWeekCount);
            });

        });
    
        describe('classifyMissingProducts', function() {
            it('is a function', function() {
                expect(classifyMissingProducts).to.be.a('function');
            });
            it('returns an array of classified store-product pairs', function() {
                let result = classifyMissingProducts(testData.dataInput3, 202001, 202003);
                expect(result).to.eql(testData.expectedProducts3);
            });

        });
    })
    
    describe('End-to-End Tests', function() {

        describe('out-ouf-stock.sh Executable', function() {
            after(() => {
                fs.unlinkSync('./tests/test_inputs_missing_products.csv');
            });

            it('Creates output file from CLI arguments/flags and input CSV', async function(){
                const {stdout, stderr } = await exec('./out-of-stock.sh --input ./tests/test_inputs.csv --start 202001 --end 202003');
                if (stderr) throw stderr;
                let file = fs.readFileSync('./tests/test_inputs_missing_products.csv', 'utf-8');
                expect(file).to.eql(testData.expectedProducts3.join('\n'));
                console.log('ok');
            });
        });

    });
    
});