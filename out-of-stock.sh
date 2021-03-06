#!/bin/bash

# Executable file for invoking NodeJS script with CLI arguments and flags

# Sample usage in terminal:
# `./out-of-stock.sh --input path/to/input.csv --start 202103 --end 202106`

INPUT_PATH=""
START_WEEK=""
END_WEEK=""

for arg in "$@"
do
    case $arg in
        --input)
        INPUT_PATH="$2"
        shift
        shift
        ;;
        --start)
        START_WEEK="$2"
        shift
        shift
        ;;
        --end)
        END_WEEK="$2"
        shift
        shift
        ;;
    esac
done

export INPUT_PATH
export START_WEEK
export END_WEEK

node ./source/index

