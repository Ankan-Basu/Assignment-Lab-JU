#include <stdio.h>
#include <stdlib.h>

struct sq_matrix {
    int **val;
    int n;
};
typedef struct sq_matrix sq_matrix;

// utiltiy func
int **allocate_array(int n);
void free_array(int **arr, int n);
void print_array(int **arr, int n);
float **gauss_eliminate(sq_matrix mat);
// 

sq_matrix transpose(sq_matrix mat);
long long det(sq_matrix mat);
sq_matrix inverse(sq_matrix mat);
int largest_eigen_val(sq_matrix mat);
int rank(sq_matrix mat);


int main() {
    sq_matrix mat1;

    mat1.val = allocate_array(5);
    mat1.n = 5;

    for (int i=0; i<mat1.n; i++){
        for (int j=0; j<mat1.n; j++){
            scanf("%d", &mat1.val[i][j]);
        }    
    }

    print_array(mat1.val, mat1.n);

    float **g = gauss_eliminate(mat1);

    printf("\n");
    for (int i=0; i<mat1.n; i++) {
        for (int j=0; j<mat1.n; j++) {
            printf("%f\t", g[i][j]);
        }
        printf("\n");
    }

    free_array(mat1.val, mat1.n);

    return 0;
}


sq_matrix transpose(sq_matrix mat) {
    sq_matrix transp;
    transp.n = mat.n;
    transp.val = allocate_array(transp.n);

    for (int i=0; i<transp.n; i++) {
        for (int j=0; j<transp.n; j++) {
            transp.val[i][j] = mat.val[j][i];
        }
    }

    return transp;
}

float **gauss_eliminate(sq_matrix mat) {
    int pivot, target;

    float **tmp = malloc((mat.n)*sizeof(float *));
    if (tmp == NULL) {
        exit(-1);
    }
    for (int i=0; i<mat.n; i++) {
        tmp[i] = malloc((mat.n)*sizeof(float));
        if(tmp[i] == NULL) {
            exit(-1);
        }
    }

    for (int i=0; i<mat.n; i++) {
        for (int j=0; j<mat.n; j++) {
            tmp[i][j] = mat.val[i][j];
        }
    }

    for (int j=0; j<mat.n; j++) { //each col
        pivot = tmp[j][j]; 
        for (int i=j+1; i<mat.n; i++) {
            target = tmp[i][j];
            for (int k=j; k<mat.n; k++) {
                tmp[i][k] = tmp[i][k] - (target/pivot)*tmp[j][k];
            }
        }
    }

    return tmp;
}

int **allocate_array(int n) {
    int **arr = NULL;
    arr = malloc(n*sizeof(int *));
    if (arr == NULL) {
        exit(-1);
    }
    for (int i=0; i<n; i++){
        arr[i] = malloc(n*sizeof(int));
        if (arr[i] == NULL) {
            exit(-1);
        }
    }
    return arr;
}

void free_array(int **arr, int n) {
    for (int i=0; i<n; i++) {
        free(arr[i]);
    }
    free(arr);
}

void print_array(int **arr, int n) {
    printf("\n");
    for (int i=0; i<n; i++) {
        for (int j=0; j<n; j++) {
            printf("%d\t", arr[i][j]);
        }
        printf("\n");
    }
}

