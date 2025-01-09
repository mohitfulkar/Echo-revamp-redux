L1 = [1,2,3,4,5,6,7,8]
L2 = [6,5,4,3,2,1]
L3 = [1,3,5,4,2,3]

def calculateWeight(L):
    mid = len(L) // 2
    left_weight = sum(L[:mid])
    #right_weight = sum(x for x in L[mid:])
    right_weight = sum(L[mid:])
    if left_weight > right_weight:
        print('Left-Heavy')
    elif right_weight > left_weight:
        print('Right-Heavy')
    else:
        print('Balanced')

calculateWeight(L1)
calculateWeight(L2)
calculateWeight(L3)
