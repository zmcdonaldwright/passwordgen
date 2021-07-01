import random

first = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet", "Purple", "Pink", "Silver", "Gold", "Grey", "Black", "White"]
second = ["Wolf", "Tiger", "Lion", "Bear", "Elephant", "Hippo", "Panther", "Whale", "Snake", "Crocodile", "Eagle", "Panda", "Squirrel"]

def pass_gen(): 
    return random.choice(first) + random.choice(second) + str(random.randint(0,9)) + str(random.randint(0,9))