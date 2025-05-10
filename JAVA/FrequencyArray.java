import java.util.*;
public class FrequencyArray{
    public static void main(String args[]) {
        System.out.println("Enter the number of digit in Array:");
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        System.out.println("Enter the elements of Array:");
        for(int i=0;i<n;i++)
        {
            arr[i] = sc.nextInt();
            }
            System.out.println("Given Array:");

            System.out.println(Arrays.toString(arr));

            Arrays.sort(arr);
            
            System.out.println();
        Frequency(arr);
    }
    public static void Frequency(int arr[]) {
        int n= arr.length;
        int count =1;
        for(int i=1;i<n;i++){
            if(arr[i]==arr[i-1]){
                count++;
            }
            else{
                System.out.println(arr[i - 1] + " occurs " + count + " times");
                count =1;
            }
        }
        System.out.println(arr[n - 1] + " occurs " + count + " times");
    }
}
