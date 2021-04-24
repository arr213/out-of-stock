const fs = require('fs');

const { classifyMissingProducts } = require('./classifyMissingProducts');
const { 
    START_WEEK, 
    END_WEEK,
    INPUT_PATH 
} = process.env;

(function(){
    console.log(`Classify missing products from ${INPUT_PATH}, between weeks ${START_WEEK} and ${END_WEEK}...`)
    console.log('Reading input file...');
    const data = fs.readFileSync(INPUT_PATH, "utf8").split('\n');
    console.log('Processing data...');
    let missingProductList = classifyMissingProducts(data, Number(START_WEEK), Number(END_WEEK));
    console.log('Writing output file...');
    let outputFilename = `${INPUT_PATH.slice(0,-4)}_missing_products.csv`;
    fs.writeFileSync(outputFilename, missingProductList.join('\n'));
    console.log('Complete! See output file:', outputFilename);
})();


