 //package JAVA;
import java.util.Scanner;
public class Reverse_String {

  public static String reverse(String name){
    String rev = "";
    for (int i=name.length()-1; i>=0; i--){
    rev=rev+name.charAt(i);

    }
    return rev;
  }
  public static void main(String[] args){
    System.out.print("Enter a String : ");
    Scanner sc = new Scanner(System.in);
    String name=sc.nextLine();
     String Result = Reverse_String.reverse(name);
     System.out.println("The reverse of this String is : "+Result);
  }
 } 