package JAVA;

import java.util.Scanner;

public class LowerBound {

    public static int lower_bound(int[] arr, int num) {
        int low = 0;
        int high = arr.length - 1;
        int ans = arr.length;

        while (low <= high) {
            int mid = low + (high - low) / 2; // Corrected here
            if (arr[mid] >= num) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }

    public static void main(String[] args) {
        int[] arr = { 2, 3, 5, 6, 7, 8, 12, 13 };
        int num = read();
        int result = lower_bound(arr, num);
        System.out.println("Lower bound index: " + result);
    }

    private static int read() {
        Scanner scan = new Scanner(System.in);
        System.out.println("Enter the target number:");
        return scan.nextInt();
    }
}
