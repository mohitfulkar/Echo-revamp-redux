package ArrayProblem;

public class MoveZeroToEndOptimal {
    int[] move_zeroes(int[] arr){
        int n = arr.length;
        int index = 0;

        for(int i=0;i<n;i++){
            if(arr[i]!=0) arr[index++] = arr[i];
        }
        while(index<n) arr[index++] = 0;
        return arr;
    }

    public static void main(String[] args) {
        int[] arr = {3,4,5,2,1,0,0,3,0,3};
        MoveZeroToEndOptimal moveZeroToEndOptimal = new MoveZeroToEndOptimal();
        int[] newArr = moveZeroToEndOptimal.move_zeroes(arr);
        for(int i:newArr){
            System.out.print(i+" ");
        }
    }
}
