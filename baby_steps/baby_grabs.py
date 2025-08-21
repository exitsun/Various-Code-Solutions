numbers = [2, 4, 7, 5, 1, 3, 9, 6]

# biggest_odd = numbers[0]

# for num in numbers:
#     if num % 2 != 0 and num > biggest_odd:
#         biggest_odd = num

# print(biggest_odd)


biggest_odd = None

for num in numbers:
    if num % 2 != 0: 
        if biggest_odd is None or num > biggest_odd:
            biggest_odd = num

newnumbers = []
new = 0

for x in numbers: 
    if x % 2 != 0:
        new = x*x
        print(new)
        print(type(new))
        newnumbers.append(new)
        
print(newnumbers)
print(type(newnumbers))


newnumbers2 = [x*x for x in numbers if x % 2 != 0]
print(newnumbers2)