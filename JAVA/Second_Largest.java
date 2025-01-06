package JAVA;

public class Second_Largest {
    public static void main(String args[]){
        int arr[] ={23,5,46,71,3,57};
        //int n = arr.length;

        s_largest(arr);
    }
    public static void s_largest(int arr[] ) {
        int n =arr.length ;

        int max = arr[0];
        int smax = Integer.MIN_VALUE;
        for(int i=1;i<n;i++){
            if(arr[i]>max){
                smax=max;
                max=arr[i];
            }
            else if(arr[i]>smax && arr[i] != max){
                smax=arr[i];

            }
        }
        System.out.println("Second Largest Number is:" + smax);
    }
}
