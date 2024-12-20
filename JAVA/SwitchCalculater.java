package JAVA;

import java.util.Scanner;

public class SwitchCalculater {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();

        System.out.print("Select operator (+, -, *, /): ");
        char operator = scanner.next().charAt(0);

        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();

        double result = 0;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                    result = num1 / num2;
                break;
            default:
                System.out.println("Invalid operator.");
                return;
        }
        System.out.println("The result of " + num1 + " " + operator + " " + num2 + " is = : " + result);
    }
}

