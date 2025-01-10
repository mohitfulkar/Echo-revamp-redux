import java.util.Scanner;

public class LeftRotateArrayNPlaces {
  public static void leftRotation(int[] arr, int num){
    int len= arr.length;
    num= num%len;  // to find remainder

    int[] temp = new int[num];   // create temp array with remainder as its size

    for(int i=0;i<num;i++){     
       temp[i] = arr[i];

    }
    for(int i=num;i<len;i++){  // rotate array except temp array
      arr[i-num] = arr[i];
    }

    for(int i=0;i<num;i++){
      arr[len-num+i] = temp[i];
    }
  }
  public static void main(String[] args){
    Scanner sc = new Scanner(System.in);

    System.out.print("Enter the Size of Array : ");
    int size = sc.nextInt();

    int[] arr= new int[size];

    System.out.print("Enter the value of Array : ");
    for(int i=0; i<size;i++){
       arr[i] = sc.nextInt();
    }
    System.out.print("Enter the number of index to be rotate : ");
    int num = sc.nextInt();

    LeftRotateArrayNPlaces rotation = new LeftRotateArrayNPlaces();
    rotation.leftRotation(arr, num);

     System.out.print("Value of Rotation of "+num+ "places : ");
     for(int item : arr){
      System.out.print(item+" ");
     }
  }
}
