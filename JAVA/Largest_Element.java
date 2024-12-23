package JAVA ;
public class Largest_Element {

    public static int largest_Element(int arr[]){
        int max = arr[0];
                for(int i=1;i<arr.length;i++){
            if(arr[i]>max){
                max=arr[i];
            }
        }
        return max ;
    }
         public static void main(String args[]){
            int arr[] ={8,3,6,2,9,1};
            System.out.println("Array :");
            for(int num: arr){
                System.out.print(" " +num );
            }
            System.out.println("");
            int  max = largest_Element(arr);
            System.out.println("The largest element in the array is: "+  max);
         }
}
