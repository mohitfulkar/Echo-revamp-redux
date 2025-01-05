public class LargestElement {
    public static int largestElement(int[] arr, int n){

        int max =arr[0];
        for(int i=0; i<n; i++){
            if(arr[i]>max){
                max = arr[i];
            }
        }
        return max;
    }


    public static void main(String[] args){

        int[] arr ={20,40,50,65,90,34};
        int n = arr.length;
       int result = largestElement(arr,n);
       System.out.println("Largest Element in given array: " + result);
    }
}

// output - Largest Element in given array: 90