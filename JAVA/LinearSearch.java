// package JAVA ;
import java.util.*;
public class LinearSearch {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the Size of the Array:");
        int n= sc.nextInt();
        System.out.println("Enter the  Array:");
        int arr[]=new int[n];
        int len=arr.length;
        for(int i=0;i<len;i++){
             arr[i]= sc.nextInt();
        }
        System.out.println("The Array are: ");
        for(int num:arr){
            System.out.print(" "+num);
        }
        System.out.println();
        linear(arr);
    }
    public static void linear(int arr[]) {
        int len=arr.length;
        boolean InArray =false ;
           System.out.println("Enter the number, check is in the array or not !!!");
           Scanner sc =new Scanner(System.in);
           int number =sc.nextInt();
        for(int i=0;i<len;i++){
           if(arr[i]==number){
                InArray=true ;
                System.out.println("Yes, The number is in the array and Index of the number is:"+ i);
                break;
           }
        }
        if(InArray==false){
            System.out.println("Sorry, The number is not in the array");
        }
    }
}
