
public class FloorIndex {

    public static int floor(int[] arr, int target) {
        int ans = -1;
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;

            if (arr[mid] >= target) {
                ans = mid;
                high = mid - 1;

            } else {
                low = mid + 1;
            }
        }
        return ans;
    }

    public static void main(String[] args) {
        int[] arr = { 2, 3, 5, 6, 7, 12, 13, 15, 19 };
        int result = FloorIndex.floor(arr, 4);
        System.out.println(result);
    }
}