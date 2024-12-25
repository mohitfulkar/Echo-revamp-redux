package JAVA ;
public class Fibonacci{
        public static void main(String[] args){
         fibonacci(10);
        }
        public static void fibonacci(int n){
            int first =0, second = 1;
            System.out.println("Fibonacci Series up to "+n+" numbers");
            for(int i=1;i<=n;i++){
                System.out.print(" " +first );
                int temp = first+second;
                first = second ;
                second = temp ;
            }
        }
}