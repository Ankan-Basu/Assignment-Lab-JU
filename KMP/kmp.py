def compute_lps(pattern):
    M = len(pattern)
    lps = [0 for _ in range(M)]
    curr_len = 0
    i = 1

    while i < M:
        if pattern[curr_len] == pattern[i]:
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

def kmp_search(text, pattern):
    n = len(text)
    m = len(pattern)
    lps = compute_lps(pattern)

    result = []
    i = j = 0

    while i < n:
        if pattern[j] == text[i]:
            i += 1
            j += 1

        if j == m:
            result.append(i - j)
            j = lps[j - 1]

        elif i < n and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    return result

if __name__ == '__main__':
    text = input('Enter text: ')
    pat = input('Enter pattern: ')
    res = kmp_search(text, pat)
    print(f'Indices of match: {res}')