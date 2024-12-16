// Name:Satyam Jha
package JAVA;

public class Palindrome {
    public static void main(String[] args) {
        int num = 121;
        int x = num;
        int temp;
        int rem = 0;

        while (x > 0) {
            temp = x % 10;
            rem = (rem * 10) + temp;
            x = x / 10;
        }

        if (num == rem) {
            System.out.println("This is a palindrome.");
        } else {
            System.out.println("This is not a palindrome.");
        }
    }
}
