package ArrayProblem;

import java.util.Arrays;
import java.util.Scanner;

public class MoveZeroesToEnd {
    public int[] read_array(){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the size of an array");
        int size = sc.nextInt();
        int[] arr = new int[size];
        System.out.println("Enter the elements");
        for (int i = 0; i < arr.length; i++) {
            arr[i] = sc.nextInt();
        }

        return arr;
    }
    public int count_zeroes(int[] arr){
        System.out.println("arr"+ Arrays.toString(arr));
        int n = arr.length;
        int zeroes = 0;
        for(int i =0;i<n;i++){
             if(arr[i]==0) zeroes++;
        }
        return zeroes;
    }
    public int[] move_zeroes(int[] arr,int zeroCount){
        int n = arr.length;
        for(int i=0;i<zeroCount;i++){
            for(int j=0;j<n-i-1;j++){
                if(arr[j]==0){
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1]= temp;
                }
            }
        }
        return arr;
    }
    public static void main(String[] args) {
        MoveZeroesToEnd mzte = new MoveZeroesToEnd();
        int[] arr = mzte.read_array();
        int zeroCount = mzte.count_zeroes(arr);
        String moveArray = Arrays.toString(mzte.move_zeroes(arr, zeroCount));
        System.out.println(moveArray);


    }
}
