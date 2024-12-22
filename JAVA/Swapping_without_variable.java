package JAVA ;

public class Swapping_without_variable {
    public static void main(String[] args) {
      Swapping_without_variable.swapping();
    }
    public static void swapping(){
      int a = 20 ;
      int b =10 ;
      System.out.println("Before swapping, a and b is :"+a + " and " + b);
      a=a-b;
      b=a+b;
      a= b-a;
      System.out.println("After swapping a and b is :"+a + " and " + b);
    }
    
}
