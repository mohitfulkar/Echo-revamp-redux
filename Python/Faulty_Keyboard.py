num1 = '987o35l7o4'
num2 = '9870981232'


def CorrectNumber(num):
    mistakesCount = 0
    for char in num:
        if char in 'ol':
            mistakesCount += 1
    num = num.replace('l','1')
    num = num.replace('o','0')
    if mistakesCount:
        print(num, mistakesCount)
    else:
        print('No Mistakes')
'''
def CorrectNumber(num1):
    mistakesCount = 0
    correctNumber = ''
    for char in num1:
        if char == 'o':
            mistakesCount +=1
            correctNumber = correctNumber + '0'
        elif char == 'l':
            mistakesCount +=1
            correctNumber = correctNumber + '1'
        else:
            correctNumber = correctNumber + char
    if mistakesCount > 0:
        print(correctNumber, mistakesCount)
    else:
        print("No Mistakes")

def CorrectNumber(num):
    mistakesCount = 0
    translation_table = str.maketrans('ol', '01')       # working?  Store changes in a dictionary
    corrected_num = num.translate(translation_table)    #    "      apply those changes on the num
    for char in num:
        if char in 'ol':
            mistakesCount += 1
    if mistakesCount > 0:
        print(corrected_num, mistakesCount)
    else:
        print('No Mistakes')
    print(type(translation_table),translation_table)
'''

CorrectNumber(num2)
CorrectNumber(num1)
