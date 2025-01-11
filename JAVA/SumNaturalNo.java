 //package JAVA;

import java.util.Scanner;

public class SumNaturalNo {
    public static void main(String[] args) {
          Scanner sc = new Scanner(System.in);
         System.out.println("Enter a number:");
        int n = sc.nextInt();  // Read the number from the user
        sc.close();
        sumOfNaturalNo(n); 
    } 
    public static int sumOfNaturalNo(int n) {
        int sum = 0;
        if(n==0){
            System.out.println("Please Enter the Number Greater Then 0");

        }
       else{
         for (int i = 1; i <= n; i++) {
            sum = sum + i;
        }
        System.out.println("Sum of natural numbers from 1 to " + n + " is " + sum);
       }
               return sum;
    }
}
