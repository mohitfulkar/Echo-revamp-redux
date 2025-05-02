package JAVA;

public class LowerBound {

    public static int lower_bound(int[] arr, int num) {
        int low = 0;
        int high = arr.length - 1;
        int ans = arr.length;
        while (low <= high) {
            int mid = low + (low + high) / 2;
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
        int result = lower_bound(arr, 5);
        System.out.println(result);
    }
}
