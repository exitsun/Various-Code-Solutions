numbers = [1, 4, 3, 5, 6, 7, 2, 8, 9]


longest_run = []
run_storage = []
count = 1
longest_count = 1
prev = numbers[0]

for x in numbers[1:]:
    if x > prev:
        longest_run.append(prev)
        count += 1
    else:
        count = 1  # reset streak
    if count > longest_count:
        longest_count = count
    prev = x

    if len(longest_run) == longest_count:
        print(longest_run)
        


    

# print(longest_run)
print(longest_count)


