#name : mohit fulkar

def anagram(str1, str2):
    if len(str1) != len(str2):
        return False
    
    str2_list = list(str2)
    
    for outerchar in str1:
        if outerchar in str2_list:
            str2_list.remove(outerchar) 
        else:
            return False 
    
    return True

str1 = "listeng"
str2 = "silento"    
result = anagram(str1, str2)
print(result)
