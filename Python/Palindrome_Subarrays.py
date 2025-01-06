#To return all the palindrome strings from the string S

def palindrome(strA):
    # Check if the string is a palindrome
    for i in range(0, len(strA) // 2):
        if strA[i] != strA[len(strA) - i - 1]:
            return False
    return True

def palindromeSubarray():
    S = "aabbccddccaabbwwllnnllwwss"
    for i in range(len(S)):
        for j in range(i + 1, len(S) + 1): 
            if palindrome(S[i:j]) and len(S[i:j]) > 1:
                print(S[i:j])

palindromeSubarray()
