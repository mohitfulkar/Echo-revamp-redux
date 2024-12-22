
public class QuickSort {
    public static void main(String args[]){
        int arr[] ={6 ,3 ,9 ,5 ,2 ,8};
        int n = arr.length ;

        System.out.println("array before sorted:");
        for(int num:arr){
            System.out.print(" "+num);
        }
        Divide(arr,0,n-1);

        System.out.println();
        
        System.out.println("array after sorted:");
        for(int num: arr){
            System.out.print(" " +num);
        }
    }
    public static void Divide(int arr[],int low,int high){

        if(low<high){
            int pivotIndex =partition(arr,low,high);
            
            Divide(arr,0,pivotIndex-1);
            Divide(arr,pivotIndex+1,high);
        }
    }
    public static int partition(int arr[],int low , int high){
          int i =low-1 ;
          int pivot = arr[high];
        for(int j=low;j<high;j++){
            if(arr[j]<pivot){
                i++;
            int temp=arr[i];
            arr[i]=arr[j];
            arr[j]=temp;
            }
        }
            i++;
            int temp= arr[i];
            arr[i]=arr[high];
            arr[high]=temp;
            return i ;
    }
}
