# Out of Stock! 
Classify Missing Products as "Out of Stock" or "Removed"

## How to use repository
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
3)  The NodeJS script keeps a data structure in memory recording necessary information for determining whether each item is out of stock. This helps to speed up the script by only reading through the file 1 time. For much larger text files this may not be possible as it may exceed the default maximum heap size in NodeJS of 700MB.  If this is the case, see proposals for version-2 of this below.

## Program efficiency
- O(n) time complexity where n=num_lines_of_input
- O(s * p) space complexity where s=num_stores & p=max_num_products_per_store

## V2 Notes
If the size of input files causes the data structure to exceed the maximum heap size.  If recommend the following updates to the program to improve space complexity. Read the input-file via a NodeJS read-stream, copying lines of the input file to a separate file for each store_id.  The program will then be able to operate on each of these files one at a time to avoid breaking memory limits. Writing to each of these files would also be done via NodeJS write-stream as well as writing the output-file.