import java.util.Scanner;

public class checkArraySorted {
  public static boolean isSorted(int[] arr){

    for(int i=0;i<arr.length-1;i++){
      if(arr[i] > arr[i+1]){
        return false;
      }
      }
      return true;
    }
  public static void main(String[] args){
    Scanner sc = new Scanner(System.in);

    // Ask Size of Array
    System.out.print("Enter the size of Array :");
    int n= sc.nextInt();

    // initialize the Array
    int[] arr = new int[n];

    // take input from Users
    System.out.print("Enter the element of Array : ");
    for (int i = 0; i < n; i++) {
      arr[i] = sc.nextInt();
  }
    System.out.println(isSorted(arr));
  }
}
