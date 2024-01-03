import random

def convolution(arr, kernel_size=3, kernel=None):
    if kernel is None:
        kernel = [[int(random.random()*10) for _ in range(kernel_size)] for _ in range(kernel_size)]
    else:
        kernel_size = len(kernel)

    origin = int((kernel_size - 1) / 2)

    res_arr = [[0 for _ in range(len(arr))] for _ in range(len(arr))]

    for arr_row in range(len(arr)):
        for arr_col in range(len(arr)):
            res = 0
            for kernel_row in range(kernel_size):
                for kernel_col in range(kernel_size):
                    kernel_row_shifted = kernel_row - origin
                    kernel_col_shifted = kernel_col - origin

                    row_index_out_of_bounds = arr_row + kernel_row_shifted < 0 or arr_row + kernel_row_shifted >= len(arr)
                    col_index_out_of_bounds = arr_col + kernel_col_shifted < 0 or arr_col + kernel_col_shifted >= len(arr)
                    index_out_of_bounds = row_index_out_of_bounds or col_index_out_of_bounds

                    if (not index_out_of_bounds):
                        res += arr[arr_row+kernel_row_shifted][arr_col+kernel_col_shifted] * kernel[kernel_row][kernel_col]
                    else:
                        res += 0

            res_arr[arr_row][arr_col] = res

    return res_arr

if __name__ == '__main__':
    arr = [[1,2,3,4,5],
        [3,2,1,4,6],
        [1,6,1,2,3],
        [7,0,1,2,3],
        [2,3,4,1,1]]

    res_arr = convolution(arr, kernel_size=3)

    arr2 = [[60, 113, 56, 139, 85],
        [73, 121, 54, 84, 128],
        [131, 99, 70, 129, 127],
        [80, 57, 115, 69, 134],
        [104, 126, 123, 95, 130]]

    kernel = [[0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]]

    res_arr2 = convolution(arr2, kernel=kernel)
