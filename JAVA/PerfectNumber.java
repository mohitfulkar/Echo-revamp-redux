package anagram;

import java.util.Scanner;

class PerfectNumber{
    public boolean isPerfect(int num){
        int sum = 0;
        for(int i=1;i<=num/2;i++){
            if(num%i==0) sum+=i;
        }
        if(num==sum) return true;
        return false;
    }
    public static void main(String[] args){
        PerfectNumber pn = new PerfectNumber();
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the number");
        int num = sc.nextInt();
        boolean result = pn.isPerfect(num);
        if(result==true){
            System.out.println("Perfect Number");
        }else{
            System.out.println("Not a perfect Number");
        }

    }
}