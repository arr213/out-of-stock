# Out of Stock! 
### Classify Missing Products as "Out of Stock" or "Removed"


## How to use repository
This script uses NodeJS, you must have node installed already on your computer. See package manager NodeJS installation here: https://nodejs.org/en/download/package-manager/

In order to test, you will need to install the testing framework by running the command npm install
```bash
git clone https://github.com/arr213/out-of-stock.git
cd ./out-of-stock
npm install --include=dev
npm test
```

In order to run the program use the executable file "out-of-stock.sh" as such:
`./name_of_program --input path/to/input.csv --start START_WEEK --end END_WEEK`
The START_WEEK and END_WEEK should be in the format `YYYYWW` (4-digit year followed by the 2-digit week).
