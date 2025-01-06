
import java.util.Scanner;
public class OneTimeLeftRotate {

    public static void leftRotate(int[] arr,int n){

        int temp =arr[0];
        for(int i=0; i<n-1; i++){
            arr[i] =arr[i+1];
        }
        arr[n-1] = temp;
        for(int i = 0; i<n; i++){
            System.out.print(arr[i] +" ");
        }
    }
    public static void main(String[] arg){
    
        System.out.println("Enter the number of element you want:");
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int[] arr = new int[a];
        System.out.println("Enter " + a + " elements:");
        for(int i=0; i<a; i++){
            arr[i] = sc.nextInt();
        }
        

        int n = arr.length;
        leftRotate(arr, n);

    }
}

// Enter the number of element you want:
// 5
// Enter 5 elements:
// 1 2 3 4 5
// 2 3 4 5 1 
