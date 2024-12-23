package JAVA;

public class MergeSort {
    public static void main(String[] args) {
        int arr[]={9,3,4,8,5,7,1};
        int n = arr.length;
        
        System.out.println("Array Before Sorrted: ");
        for(int num:arr){
            System.out.print(" "+num);
        }

        Divide(arr,0,n-1);
        System.out.println();
    

        System.out.println("Array After Sorrted: ");
        for(int num:arr){
            System.out.print(" "+num);
        }
    }
    public static void Divide(int arr[],int low,int high){
        if(low>=high){
            return ;
        }
        int mid = low +(high-low)/2 ;

        Divide(arr,low,mid);
        Divide(arr,mid+1,high);
        Conquer(arr,low,mid,high);
    }
    public static void Conquer(int arr[],int low,int mid,int high){
        int temp[]= new int [high-low+1];
        int k =0;
        int left = low;
        int right =mid+1;
        while(left<=mid && right<=high){
            if(arr[left]<=arr[right]){
                temp[k++]=arr[left++];
            }
            else{
                temp[k++]=arr[right++];
            }

        }
        while(left<=mid){
            temp[k++]=arr[left++];
        }
        while(right<=high){
            temp[k++]=arr[right++];
        }

        for(int i=0;i<temp.length;i++){
            arr[i+low]=temp[i];
        }
    }
    
}
