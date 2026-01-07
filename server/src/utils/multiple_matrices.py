import numpy as np

def multiply_matrices_numpy(matrix_a, matrix_b):
    np_a = np.array(matrix_a)
    np_b = np.array(matrix_b)

    if np_a.ndim == 1:
        np_a = np_a.reshape(1, -1)
    if np_b.ndim == 1:
        np_b = np_b.reshape(-1, 1)

    if np_a.shape[1] != np_b.shape[0]:
        raise ValueError("Matrices cannot be multiplied due to incompatible dimensions.")

    result = np.matmul(np_a, np_b)
    return result.tolist()
