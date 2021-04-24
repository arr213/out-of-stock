# Out of Stock! 
Classify Missing Products as "Out of Stock" or "Removed"

## How to Use Repository
This script uses NodeJS, you must have node installed already on your computer. See package manager NodeJS installation here: https://nodejs.org/en/download/package-manager/

In order to test, you will need to first install the needed testing framework (npm packages of MochaJS and ChaiJS). To do so, follow the directions below.
```bash
git clone https://github.com/arr213/out-of-stock.git
cd ./out-of-stock
npm install --include=dev
npm test
```

In order to run the program use the executable file "out-of-stock.sh" as such:
`./out-of-stock.sh --input path/to/input.csv --start START_WEEK --end END_WEEK`
The START_WEEK and END_WEEK should be in the format `YYYYWW` (4-digit year followed by the 2-digit week).

## Assumptions
1) The program is written assuming GIGO, per the instructions.  The program must receive a correctly formatted csv file (see ./assessment_documents/take_home_out_of_stock.md) and correctly formatted start and end weeks.
2) The program reads the input-file skipping weeks that are not in-between START_WEEK and END_WEEK.  If a product was temporarily out of stock before the START_WEEK or after the END_WEEK, it will have no effect on the classification of the product.
3)  The NodeJS script keeps a data structure in memory recording necessary information for determining whether each item is out of stock. This helps to speed up the script by only reading through the file data one time. For much larger text files this may not be possible as it may exceed the default maximum heap size in NodeJS of 700MB.  If the size of input-files causes the data structure to exceed the maximum heap size, I recommend updating the program to operate via NodeJS read/write streams. This would read the input-file one line at a time, copying lines of the input file to a separate file for each store_id.  The program would then be able to operate on each of these files one at a time to avoid breaking memory limits.
4) Products are not repeated within the same week at the same store in a file. (ie. no duplicates of exactly the same line in a csv input-file)

## Heuristic Analysis
The heuristic was given as follows:
1. If a product was observed in a particular store, then is no longer observed in subsequent week(s) at that store, and then observed again up to and including the most recent week, consider it "OUT_OF_STOCK",
2. If a product was observed in a particular store but then no longer observed for all subsequent weeks up to the most recent week in that store, consider it "REMOVED",
3. Otherwise, consider the product as available and do not include the product in the report.

To emulate this know only first_week_stocked, last_week_stocked, num_weeks_stocked for a given store-product pair:
1. We know a product is neither OUT_OF_STOCK nor REMOVED if it is in stock every week from it's first_week_stocked until the END_WEEK. aka:
    - num_weeks_stocked === (END_WEEK - first_week_stocked + 1)
2. Otherwise, we know a product is OUT_OF_STOCK if 
    - num_weeks_stocked === (last_week_stocked - first_week_stocked + 1)
3. Otherwise, the product was REMOVED.

## Program Efficiency
- O(n) time complexity where n=num_lines_of_input
- O(s * p) space complexity where s=num_stores & p=max_num_products_per_store

