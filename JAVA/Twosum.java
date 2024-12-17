 package JAVA;
 public class Twosum {
 
    public static int[] twoSum (){
        int nums[]= {1, 3, 5, 6, 2};
        int n=nums.length;
        int target = 9;
        for(int i=0;i<n;i++){
            for(int j=i+1;j<n;j++){
                if(nums[i]+nums[j]==target){
                    int a[]={i,j};
                    return a;
                }
            }
        }
        return null ;
    }
    public static void main(String[] args) {
        int result[]=Twosum.twoSum();
        if(result != null){
        System.out.println("the index are: " +  result[0]+ " " + result[1] );
    }
    else{
        System.out.println("No solution found.. ");
    }
}
}
