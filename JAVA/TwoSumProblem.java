public class TwoSumProblem {

    public static boolean twoSum(int[] arr, int target){

        for(int i=0; i<arr.length; i++){
            for(int j =i+1; j<arr.length; j++){
            if((arr[i] + arr[j]) == target){
                return true;
            }      
        }
    }
     return false;
    }
    public static void main(String[] args){
        int[] arr = {-2, -4, 6, 7};
        int target = 3;

        if(twoSum(arr,target)){
            System.out.println("true");
        }
        else{
            System.out.println("false");
        }
    }
}
