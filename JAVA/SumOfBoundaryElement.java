public class SumOfBoundaryElement {
    public static void main(String[] args) {
		int[][] arr = {{1,2,3}, {4,5,6},{7,8,9}};
		
		int a = arr.length;
		int b = arr[0].length;
		
		int sum=0;
		for(int i =0; i<a; i++) {
			for(int j=0; j<b; j++) {
				
				if(i==0 || j==0 || i == a-1 || j ==b-1) {
					sum+= arr[i][j];
					
				}
			}
		}
		System.out.print("Sum of Boundary elements of given 2D array: " +sum);

	}

}

// Sum of Boundary elements of given 2D array: 40