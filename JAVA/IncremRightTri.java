package Pattern;

public class IncremRightTri {
    static  void print13(int n ){
        int num = 1;
        for(int i =1;i<=n;i++){
            for(int j=1;j<=i;j++){
                System.out.print(num + " ");
                num++;
            }
            System.out.println();
        }
    }
    public static void main(String[] args) {
        IncremRightTri.print13(5);
    }
}

//1
//2 3
//4 5 6
//7 8 9 10
//11 12 13 14 15