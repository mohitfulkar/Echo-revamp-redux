package ArrayProblem2;

public class MaximumSubarray {
    public int findMaximumSubarraySum(int[] nums) {
        int n = nums.length;
        int maxSum = Integer.MIN_VALUE; // Initialize to the smallest possible value

        for (int i = 0; i < n; i++) {
            int currentSum = 0; // Reset the sum for each new starting index
            for (int j = i; j < n; j++) { // Compute the sum of subarray starting from 'i'
                currentSum += nums[j];
                maxSum = Math.max(maxSum, currentSum); // Update the max sum if current sum is greater
            }
        }

        return maxSum;
    }
    public static void main(String[] args) {
        MaximumSubarray solution = new MaximumSubarray();
        int[] nums = {2, 3, 4, -9, -34, 5, 6, -3};
        int result = solution.findMaximumSubarraySum(nums);
        System.out.println("Maximum Subarray Sum: " + result);
    }
}
