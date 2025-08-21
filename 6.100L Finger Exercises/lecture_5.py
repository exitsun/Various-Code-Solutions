# Assume you are given a string variable named my_str. Write a piece of Python code that prints out a new string containing the even indexed characters of my_str. For example, if my_str = "abcdefg" then your code should print out aceg.

my_str = "abcdefg"


# 1 sneaky
print(my_str[::2])

# 2 loop practice
result = ""
for i in range(len(my_str)):
    if i % 2 == 0:
        result += my_str[i]
print(result)
    
    