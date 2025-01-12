import java.util.Scanner;

public class SortChar {
  public static String sortCharacters(String input) {
    char[] chars = input.toCharArray();

    int n = chars.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (chars[j] > chars[j + 1]) {
                char temp = chars[j];
                chars[j] = chars[j + 1];
                chars[j + 1] = temp;
            }
        }
    }

    return new String(chars);
}
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println("Enter the String");
    String str = sc.nextLine();
    String result = sortCharacters(str);
    System.out.println("Sorted string is "+result);
  }
}
