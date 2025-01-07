// Right Rotate an Array by One Place

class RightRotation {
    public static void rightRotate(){
        int[] arr = {8,7,2,2,4,1,3};
        int n=arr.length;
        
        //first we print the original array
        System.out.println("Original Array: ");
        for(int i=0;i<n;i++){
        System.out.print(arr[i]+" ");
        } 
        System.out.println();
        
        //Main logic of rotating right is here
        int LastElement = arr[n-1];
        for(int i=n-1;i>0;i--){
            arr[i]=arr[i-1];
        }
        arr[0]=LastElement;
        //priting the array after rotation here
        System.out.println("Array after rotating right by one place -->");
        for(int i=0;i<n;i++){
        System.out.print(arr[i]+" ");
        }
    }
    public static void main(String[] args) {
        rightRotate();
    }
}

/*
 Output:
 Original Array: 
 8 7 2 2 4 1 3 
 Array after rotating right by one place -->
 3 8 7 2 2 4 1
*/