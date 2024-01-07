def compare_column(arr1, arr2, indx1, indx2, text_offset=0):
    '''
    Compare elements along column of 2D array
    compare col indx1 of arr1 with col indx2 of arr2
    returns True if all elements in indx1 col match with corresponding elements of indx2 col
    '''
    n = len(arr1) # arr1 -> pattern
    matched = True

    for i in range(n):
        if arr1[i][indx1] != arr2[text_offset+i][indx2]:
            matched = False
            break

    return matched


def compute_lps(pattern):
    '''
    Compute LPS for 2D array (along column)
    '''
    M = len(pattern) #sq matrix MxM
    lps = [0 for _ in range(M)]
    curr_len = 0
    i = 1

    while i < M:
        if compare_column(pattern, pattern, curr_len, i):
            curr_len += 1
            lps[i] = curr_len
            i += 1
        else:
            if curr_len > 0: 
                # i.e. this will keep executing (due to outer loop) till curr_len becomes 0
                curr_len = lps[curr_len - 1]
            else:
                # i.e. when curr_len has become 0
                lps[i] = 0
                i += 1

    return lps


def kmp_search_2d(text, pattern):
    '''
    KMP for 2D sequence
    First run KMP normally across column then iterate over rows
    '''
    n = len(text)
    m = len(pattern)
    lps = compute_lps(pattern)
    tot_res = []

    for row in range(n-m+1):
        result = []
        i = j = 0
        while i < n:
            if compare_column(pattern, text, j, i, row):
                i += 1
                j += 1

            if j == m:
                result.append(i - j)
                j = lps[j - 1]

            elif i < n and not compare_column(pattern, text, j, i, row):
                if j != 0:
                    j = lps[j - 1]
                else:
                    i += 1
        tot_res.append(result)
    return tot_res


def print_matrix(matrix):
    for row in matrix:
        print(row)


if __name__ == '__main__':
    pat = [[1,2,1],
    [3,1,3],
    [0,0,0]]

    text = [
    [0,1,2,1,2,1],
    [3,3,1,3,1,3],
    [0,0,0,0,0,0],
    [1,2,1,1,2,1],
    [3,1,3,3,1,3],
    [0,0,0,0,0,0]
    ]

    print('Matrix Subset Problem:')
    print('\nSmall matrix:')
    print_matrix(pat)
    print('\nLarge matrix:')
    print_matrix(text)

    print('\nIndices of match:')
    res = kmp_search_2d(text, pat)

    for i in range(len(res)):
        for j in range(len(res[i])):
            print(f'({i}, {res[i][j]})', end=', ')
    print()

    # print(res)