# What's the difference between == and is? 
# Give one example where == True but is False

# == compares the values of the objects
# is compares if two variables point to the same object in memory

# "aa" is "a" * 2 
# True
# x = "a"
# "aa" is x * 2
# False

# "aa" == x * 2
# True

a = 256
b = 256
c = 257
d = 257
print(a is b, c is d)

z = 500
y = 500
print(z == y, z is y)

# both will result in a false 

# if []: 
# if[0]:
s = "py"; t = "py"
u = "".join(["p","y"])
print(s is t, s is u, s == u)

# True (it is exact identical object)  False (u is a mutable) True (same value)

print((1==1) is True, (1==2) is False, (None is None))