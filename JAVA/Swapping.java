public class Swapping {
    public static void swapping(String[] args){
        int a =10;
        int b =20;
        int temp;
        System.out.println("Before swapping");
        System.out.println(" a is "+a);
        System.out.println(" b is "+b);
        temp = a;
        a = b;
        b = temp;
        System.out.println("After swapping");
        System.out.println(" a is "+a);
        System.out.println(" b is "+b);
    }
    public static void main(String args[]){
          Swapping.swapping(args);
    }
}
