public class FindSubstring {
    public static void allSubString(String str, int n){
        
        int count = 0;
        for(int i=0; i < n; i++){
            for(int j = i+1; j <= n; j++){
                String ss = str.substring(i, j);
                System.out.println(ss);
                count++;
            }
        }

        System.out.println("Count of SubStrings in a String: " + count);
    }
    public static void main(String[] args){
        String str = "Diksha";
        int n = str.length();
        allSubString(str, n);
    }
}

