import java.util.Scanner;

public class LowerUpperCaseASCII {

  public static String convertCase(String str){

    StringBuilder lowerCase = new StringBuilder();
    StringBuilder upperCase = new StringBuilder();

    for(int i=0;i<str.length();i++){
       char ch = str.charAt(i);
       lowerCase.append(ch >= 'A' && ch <= 'Z' ? (char)(ch + 32) : ch);
       upperCase.append(ch >= 'a' && ch <= 'a' ? (char)(ch - 32) : ch);
    }
    return "Lower Case : "+lowerCase+ "\nUpper Case : "+upperCase;
  }
  public static void main(String[] args) {
  System.out.print("Enter any String : ");
  Scanner sc = new Scanner(System.in);
  String str= sc.nextLine();
  System.out.println(convertCase(str));
  }
}