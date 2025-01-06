package StringProblem;

import java.util.Scanner;

public class RemoveVowelsMethod {
    public static String removeVowels(String input) {
        return input.replaceAll("[aeiouAEIOU]", "");
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the string");
        String input = sc.nextLine();
        String result = removeVowels(input);
        System.out.println("Original String: " + input);
        System.out.println("String without vowels: " + result);
    }
}
