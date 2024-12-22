package ArrayProblem;

public class CheckSorted {
    boolean check(int[] arr){
        boolean flag = true;
        for(int i=0;i<arr.length-1;i++){
            if(arr[i]>arr[i+1]){
                flag = false;
            }
        }
        return flag;
    }

    public static void main(String[] args) {
        int[] arr = {2,4,5,6,7};
        String result;
        CheckSorted cs = new CheckSorted();
        boolean check = cs.check(arr);
        if(check==true) result = "sorted";
        else result = "not sorted";
        System.out.println("This array is "+result);
    }
}
