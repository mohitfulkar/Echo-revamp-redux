public class ReverseString {

    public static void reverseString(String str, int n){
        String rev = "";
        for(int i=n-1; i>=0; i--){
            rev += str.charAt(i);
        }

        System.out.println(rev);

    }
    public static void main(String[] args){
        String str = "Diksha Chaurasia";
        int n = str.length();
        reverseString(str,n);


    }
}

// aisaruahC ahskiD
