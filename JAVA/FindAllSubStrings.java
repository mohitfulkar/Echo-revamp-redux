public class FindAllSubStrings {

        public static void allSubString(String str, int n) {
            int count = 0;
            for (int i = 0; i < n; i++) { 
                for (int j = i + 1; j <= n; j++) { 
                    String ss = str.substring(i, j); 
                    System.out.println(ss);
                    count++;
                }
            }
            System.out.println("Count of SubStrings: " + count);
        }
    
        public static void main(String[] args) {
            String str = "Diksha";
            int n = str.length();
            allSubString(str, n);
        }
    }
    
    // output -
    // D
    // Di
    // Dik
    // Diks
    // Diksh
    // Diksha
    // i
    // ik
    // iks
    // iksh
    // iksha
    // k
    // ks
    // ksh
    // ksha
    // s
    // sh
    // sha
    // h
    // ha
    // a
    // Count of SubStrings: 21
