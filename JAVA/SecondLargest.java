//Second Largest Element in an Array (without Sorting)
import java.util.*;
public class SecondLargest {
  
    public static void largestNum(){
      
      Scanner sc = new Scanner(System.in);
      System.out.print("Enter the Array Size : ");
      int n= sc.nextInt();
      System.out.print("Enter the elements : ");
      int[] arr = new int[n];
      for(int i=0;i<n;i++){
        arr[i]=sc.nextInt();
      }
      
      int max=arr[0];
      int smax=arr[0];
      
      for(int i=0;i<n;i++){
        if(arr[i]>max){
          smax= max;
          max=arr[i];
        }else if(arr[i]>smax && arr[i]!=max){
          smax=arr[i];
        }
      }System.out.println("The second largest number is "+smax);
    }
    
    public static void main(String[] args) {
      largestNum();
  }
}

/*
 Output : 
 Enter the Array Size : 4
Enter the elements : 12 34 3 45 2
The second largest number is 34
 */