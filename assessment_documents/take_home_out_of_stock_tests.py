# These tests are provided as a guide. Your submission may be written in any
# language and may integrate these tests in any way you choose (or not at all).
# For example, you may rearrange these test cases into other test functions,
# bring these test cases into a different language, etc.

# This is a placeholder for a function that solves the problem. It operates on
# language-native representations and does not consider serialization to/from
# CSV. Your solution may operate totally differently! This is provided only as
# a placeholder.
def classify_missing_products(observations, start_week, end_week):
    raise NotImplementedError()

from operator import itemgetter

def assert_expected(expected, actual):
    assert len(expected) == len(actual) and\
        sorted(expected, key=itemgetter('store_id', 'product_id', 'status')) ==\
            sorted(actual, key=itemgetter('store_id', 'product_id', 'status'))

def test_all_available():
    observations = [
        { 'week': 202001, 'store_id': 1000, 'product_id': '0123' },
        { 'week': 202002, 'store_id': 1000, 'product_id': '0123' },
        { 'week': 202003, 'store_id': 1000, 'product_id': '0123' },
        { 'week': 202001, 'store_id': 2000, 'product_id': '0123' },
        { 'week': 202002, 'store_id': 2000, 'product_id': '0123' },
        { 'week': 202003, 'store_id': 2000, 'product_id': '0123' },
        { 'week': 202002, 'store_id': 1000, 'product_id': '3210' },
        { 'week': 202003, 'store_id': 1000, 'product_id': '3210' }
    ]
    result = classify_missing_products(observations, 202001, 202003)
    assert_expected([], result)

def test_ignore_out_of_bounds_weeks():
    observations = [
        { 'week': 202001, 'store_id': 1000, 'product_id': '0123' },
        { 'week': 202003, 'store_id': 1000, 'product_id': '0123' },
        { 'week': 202004, 'store_id': 1000, 'product_id': '0123' },
        { 'week': 202005, 'store_id': 1000, 'product_id': '0123' },
    ]
    result = classify_missing_products(observations, 202004, 202005)
    assert_expected([], result)

def test_remove():
    observations = [
        { 'week': 202001, 'store_id': 1000, 'product_id': '0123' },
        { 'week': 202002, 'store_id': 1000, 'product_id': '0123' }
    ]
    expected = [
        { 'store_id': 1000, 'product_id': '0123', 'status': 'REMOVED' }
    ]

    result = classify_missing_products(observations, 202001, 202003)
    assert_expected(expected, result)

