import java.util.Scanner;

public class LowerUpperCase {
  public static String  check(String str){
    String ChangeLower = str.toLowerCase();
    String ChangeUpper = str.toUpperCase();
    return "LowerCase = "+ChangeLower+" \nUpperCase = "+ChangeUpper;

  }
  public static void main(String[] arge){
    System.out.print("Enter Any String : ");
    Scanner sc =  new Scanner(System.in); 
    String str = sc.nextLine();
    
    System.out.println(check(str));

  }
}
