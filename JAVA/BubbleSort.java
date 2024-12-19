package JAVA;
public class BubbleSort {
    public static void bubbleSort() {
        int nums[] = {9, 3, 7, 2, 6, 1}; 
        int n = nums.length;
        System.out.println("Original array:");
        for (int num : nums) {
            System.out.print(num + " ");
        }
        System.out.println();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (nums[j] > nums[j + 1]) {
                    int temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                }
            }
            System.out.println("After pass " + (i + 1) + ":");
            for (int num : nums) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
    }
    public static void main(String[] args) {
        BubbleSort.bubbleSort(); 
    }
}
