
import java.util.*;
public class UnionOfTwoMatrix {
    public static void Union(int[] arr, int[] arr1){
        int a = arr.length;
       int b = arr1.length;
       int n = arr.length + arr1.length;
       int[] temp = new int[n];
       
       for(int i=0; i<a; i++){
           temp[i] = arr[i];
       }
       for(int i=a; i<n; i++){
           temp[i] = arr1[i-a];
       }
       
         System.out.print(Arrays.toString(temp)); 
    }
    public static void main(String[] args) {
       
       System.out.println("Enter the number of element you want to enter in first array: ");
       Scanner sc = new Scanner(System.in);
       int n = sc.nextInt();
       System.out.println("Enter the number of element you want to enter in second array: ");
       int n1 = sc.nextInt();
       
       int[] a = new int[n];
       int[] b = new int[n1];
       
       System.out.println("Enter the elements for first array: ");
       for(int i=0; i<n; i++){
           a[i] = sc.nextInt();
       }
        System.out.println("Enter the elements for second array: ");
       for(int i=0; i<n1; i++){
           b[i] = sc.nextInt();
       }
       
      Union(a, b);
  
    }
}


