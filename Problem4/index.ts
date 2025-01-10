/**
 * Three different implementations to calculate sum of numbers from 1 to n
 * @param n The upper bound number
 * @returns The sum of numbers from 1 to n
 */

// Time complexity: O(n) - Linear time as it iterates n times
// Space complexity: O(1) - Constant space as it only uses a single variable
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Mathematical formula: sum = n * (n + 1) / 2
// Time complexity: O(1) - Constant time as it uses mathematical formula
// Space complexity: O(1) - Constant space
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}

// Recursive approach
// Time complexity: O(n) - Linear time due to n recursive calls
// Space complexity: O(n) - Linear space due to call stack
function sum_to_n_c(n: number): number {
    if (n <= 0) return 0;
    return n + sum_to_n_c(n - 1);
}
