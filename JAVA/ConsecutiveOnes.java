import java.util.Scanner;

public class ConsecutiveOnes {
  public static int maxConsecutiveOnes(int[] arr){
     int maxCount=0;
     int count=0;

     for(int num : arr){
      if(num==1){
      count++;
      maxCount= Math.max(maxCount, count);
     }
     else{
      count=0;
     }
    }
     return maxCount;
  }
  public static void main(String[] args) {
    Scanner sc= new Scanner(System.in);
    System.out.print("Enter the size of Array: ");
    int size = sc.nextInt();
    
    int[] arr =new int[size];
 
    System.out.print("Enter the value of Array : ");
    for(int i=0;i<size;i++){
    arr[i] = sc.nextInt();
    }
    System.out.print("Maximum Consecutive Ones : "+maxConsecutiveOnes(arr));
  }
}

