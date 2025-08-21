numbers = [2, 6, 4, 7, 9, 1, 3]
# how many numbers are bigger than 4?

count = 0

for x in numbers:
    if x > 4:
        count += 1
print(count, "numbers are bigger than 4 in this array")

# count how many times a occurs in a word

word = "banana"
count = 0

for x in word:
    if x == "a":
        count +=1

print(count, "times an 'a' is in the given word")


for y in numbers:
    print(y)
    if y % 2 !=0:
        break
    