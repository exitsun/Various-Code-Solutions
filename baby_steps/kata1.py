
# is_even(n: int) -> bool
# % forbidden


def is_even(n: int) -> bool:
    return (n & 1) == 0

 # returns True if (n & 1) == 0 (even), else False (odd).

# (n & 1) equals n % 2 for all integers; parity lives in the LSB, so sign doesn’t affect it.

# Map  of values

#n:    -4 -3 -2 -1  0  1  2  3  4
#n&1:   0  1  0  1  0  1  0  1  0
#even?: T  F  T  F  T  F  T  F  T



# last_char(s: str) -> str

def last_char(s: str) -> str:
    if s == "":
        raise ValueError("empty string")
    return s[-1]
    
# mean(numbers: list[float | int | None]) -> float


def mean(numbers: list[float | int | None]) -> float:
    clean = [x for x in numbers if x is not None]
    if not clean:
        raise ValueError("empty list")
    return sum(clean)/len(clean)
# Two-pass mean: O(n) time, O(n) extra space for the filtered list.

def mean_one_pass(numbers: list[float | int | None]) -> float:
    total = 0
    count = 0
    for x in numbers:
        if x is not None:
            total += x
            count += 1
    if count == 0:
        raise ValueError("empty list or all None")
    return total / count

#  One-pass is O(n) time, O(1) space.


# ----TESTS---- #

# is_even extras
assert is_even(-3) is False
assert is_even(10**9 + 1) is False

# last_char extra
assert last_char("x") == "x"

# mean extras
assert abs(mean([0, 0.0, None]) - 0.0) < 1e-9       # zeros must survive
data = [1, None, 3]
_ = mean(data)
assert data == [1, None, 3]                         # prove no mutation
assert abs(mean([True, False, 1]) - (1+0+1)/3) < 1e-9
# bool counts: in Python, bool subclasses int (True==1, False==0).

# is_even base
assert is_even(0) is True
assert is_even(7) is False
assert is_even(-4) is True

# last_char raise path
try:
    last_char("")
    assert False, "should have raised"
except ValueError:
    pass

# mean base
assert abs(mean([1, 2, 3]) - 2.0) < 1e-9
assert abs(mean([None, 10, None]) - 10.0) < 1e-9
assert abs(mean([1.0, 2, None, 3.0]) - 2.0) < 1e-9
try:
    mean([None, None]); assert False
except ValueError:
    pass

# mean_one_pass equivalence
cases = [
    [1, 2, 3],
    [None, 10, None],
    [1.0, 2, None, 3.0],
    [0, 0.0, None],
    [True, False, 1],
]
for c in cases:
    assert abs(mean_one_pass(c) - mean(c)) < 1e-9


