import java.util.Scanner;

public class SubstringCounter {
    public static int countSubstring(String mainString, String subString) {
        int count = 0;
        int subLen = subString.length();

        
        for (int i = 0; i <= mainString.length() - subLen; i++) {
            
            if (mainString.substring(i, i + subLen).equals(subString)) {
                count++;
            }
        }

        return count;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        
        System.out.print("Enter the main string: ");
        String mainString = scanner.nextLine();

        System.out.print("Enter the substring to count: ");
        String subString = scanner.nextLine();

        
        int result = countSubstring(mainString, subString);

        System.out.println("The substring '" + subString + "' occurs " + result + " times in the string.");
        
        scanner.close();
    }
}
