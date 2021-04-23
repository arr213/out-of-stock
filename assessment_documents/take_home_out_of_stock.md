## Intro

Datasembly collects much of its data from online shopping sites that allow users to virtually shop a particular store. This gives us visibility into what is happening on the shelf in these stores. However, when a product is out of stock on the shelf, some retailers simply remove the product from their shopping site, which makes it difficult to determine if a product is out of stock or no longer being carried at a particular store.

## Goal

Analyze historical observations of products in stores to generate a report of which products were likely out of stock and which have likely been removed from stores. To do this, use the following heuristic:

1. If a product was observed in a particular store, then is no longer observed in subsequent week(s) at that store, and then observed again up to and including the most recent week, consider it "OUT_OF_STOCK",
2. If a product was observed in a particular store but then no longer observed for all subsequent weeks up to the most recent week in that store, consider it "REMOVED",
3. Otherwise, consider the product as available and do not include the product in the report.

For example: The input contains data from weeks 202103, 202104, 202105, a single product (product A), and a single store (store #900). The input data contains two observations: product A in store #900 for week 202103 and product A in store #900 for week 202105. Because the product was available in 2 of the 3 observation weeks and present in weeks before and after it was not present (including the latest week), it is marked "OUT_OF_STOCK" for store #900.

## Solution

Create a command line program in the language of your choosing that accepts as input a path to a CSV containing all of the input data, the start week (inclusive), and the end week (inclusive) of the analysis and produces a CSV report containing all products that are "OUT_OF_STOCK" or "REMOVED". Include unit tests demonstrating that your program works in accordance with the specification.

Calling the program should look like this:

`./name_of_program --input path/to/input.csv --start 202103 --end 202106`

where the week format is the four digit year followed by the two digit ISO week number.

Both input and output CSVs should be formatted with a header row and delimited by comma (,). All newlines are represented in the OS's native representation (\n on Linux, MacOS, and other unix-likes; \r\n on Windows). No values contain commas (,) or any kind of new line characters -- neither \n nor \r are present in any value strings.

### Program Input

The input CSV contains 3 columns:

* week: same format as above (four digit year followed by the two digit ISO week number)
* store_id (int): unique identifier of a store
* product_id (string): unique identifier of a product

Example input format:

```
week,store_id,product_id
202103,900,065633412026
202105,700,016000449770
202104,700,016000449770
202103,900,016000487697
202103,700,016000449770
202103,700,016000487697
202104,900,065633412026
202105,900,065633412026
202104,700,016000487697
```

### Program Output

The output CSV should contain 1 row for every product that is either "OUT_OF_STOCK" or "REMOVED" for each store present in the input.

The output CSV should contain 3 columns:

* store_id (int): unique identifier of a store
* product_id (string): unique identifier of a product
* status (string): either OUT_OF_STOCK or REMOVED

Example output format (not related to input example format above):

```
store_id,product_id,status
1000,050000143740,REMOVED
1000,028000993801,OUT_OF_STOCK
2000,028000993801,OUT_OF_STOCK
```

## Submission

Include in your submission the source code of your program, including unit tests. Also include build instructions and any other information that would help us run your submission. In a follow-up conversation, we will discuss how you approached solving this problem and how your submission works. We will also revisit the heuristic and discuss ways in which it could be improved.

## Assumptions

Do not handle the following cases -- you can assume that they won't happen. If someone provides your program data that violates these assumptions, GIGO applies.

* The end parameter is the most recent week
* All of the data is from retailers who remove items from the shelf when they are out of stock OR no longer available

Where you are unsure about what the specification is asking for in a particular case, clearly state how you are handling that case and why you chose to handle it the way you did.

## Sample unit test

Sample unit tests are attached. These tests only cover a subset of the requirements and are meant as a guide.

