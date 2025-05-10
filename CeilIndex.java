public class CeilIndex {

    public static int floor(int[] arr, int target) {
        int ans = -1;
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;

            if (arr[mid] <= target) {
                ans = mid; // 4
                low = mid + 1;

            } else {
                high = mid - 1;
            }
        }
        return ans;
    }

    public static void main(String[] args) {
        int[] arr = { 1, 2, 3, 4, 4, 4, 4, 12, 13, 15, 19 }; // mid=5
        int result = CeilIndex.floor(arr, 4);
        System.out.println(result);
    }
}