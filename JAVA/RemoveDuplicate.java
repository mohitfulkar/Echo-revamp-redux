package ArrayProblem;

import java.util.Arrays;

public class RemoveDuplicate {
    public void  count_duplicate(int[] arr){
        int n = arr.length;
        int dupCount = 0;
        for (int i = 0;i<n;i++){
            for(int j=i+1;j<n;j++){
                if( arr[i] != Integer.MIN_VALUE && arr[i]==arr[j]){
                    arr[j] = Integer.MIN_VALUE;
                    dupCount++;
                }
            }
        }
        int[] newArr = new int[n-dupCount];
        int index=0;
        for (int i = 0; i < n; i++) {

            if(arr[i]!=Integer.MIN_VALUE){
                newArr[index++] = arr[i];
            }
        }
        System.out.println(Arrays.toString(newArr));
    }

    public static void main(String[] args) {
        RemoveDuplicate rd = new RemoveDuplicate();
        int[] arr = {0,2,5,4,3,5,2,0};
        rd.count_duplicate(arr);
    }
}
