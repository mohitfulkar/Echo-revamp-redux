package JAVA ;
import java.util.Scanner;
public class Fibonacci{
        public static void main(String[] args){
            Scanner sc = new Scanner(System.in);
            System.out.print("Enter the number: ");
            int n = sc.nextInt();
         fibonacci(n);
        }
        public static void fibonacci(int n){

            int first =0, second = 1;
            System.out.println("Fibonacci Series up to "+n+" numbers");
            for(int i=1;i<=n;i++){
                System.out.print(" " +first );
                int temp = first+second;
                first = second ;
                second = temp ;
            }
        }
}