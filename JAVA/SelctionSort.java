package JAVA;

class SelectionSort {

    public static void selectionSort() {
        int nums[] = {6, 4, 5, 3, 2, 1};
        int n = nums.length;

        System.out.print("Before sorted array: ");
        for (int num : nums) {  // Print array using a loop
            System.out.print(num + " "); 
        }
        System.out.println(); // Move to the next line

         for (int i = 0; i < n - 1; i++) {
            int minIndex = i;

            for (int j = i + 1; j < n; j++) {
                if (nums[j] < nums[minIndex]) { 
                    minIndex = j;
                }
            }

              int temp = nums[minIndex];
            nums[minIndex] = nums[i];
            nums[i] = temp;

                  System.out.print("Array after pass " + (i + 1) + ": ");
            for (int num : nums) {
                System.out.print(num + " ");
            }
            System.out.println(); 
        }

           System.out.print("After sorted array: ");
        for (int num : nums) { 
            System.out.print(num + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        SelectionSort.selectionSort();
    }
}

