import java.util.Scanner;

public class LeapYear {
  public void leap_year(int year){
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
      System.out.println(year + " is a leap year.");
    } else {
      System.out.println(year + " is not a leap year.");
    }
  }
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    LeapYear ly = new LeapYear();
    System.out.println("Enter the year");
    int year = sc.nextInt();
    ly.leap_year(year);
  }
}
