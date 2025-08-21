# In this python file we are doing the most basic exercises. 

word = "cat"

for i in range(len(word)):
    print(i, word[i], "It's nice to print things!")

anotherWord = "dog"
reversedWord = ""

for x in anotherWord:
    reversedWord = x + reversedWord
print(reversedWord)

numbers = [1, 4, 9, 3, 5, 7]    

biggest = 0
for x in numbers:
    if x > biggest:
        biggest = x
print(biggest)

smallest = numbers[0]
for x in numbers:
    if x < smallest:
        x = smallest
print("The smallest number is: ", smallest)

numbers2 = [5, 8, 12]

for x in numbers2:
    print(x)

for i in range(len(numbers2)):
    print("Index: ", i, "| " "Value ", numbers2[i])

for i in range(len(numbers)):
    print("Index only:", i)


word2 = "iterate"

for x in word2:
    print(x)




