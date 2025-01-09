//Rearrange Characters of a String Alternately (e.g., Vowel-Consonant)
import java.util.*;

class Rearrange {
    public static void rearranged(String str) {
        char[] arr = str.toCharArray();
        int n = arr.length;

        StringBuilder vowels = new StringBuilder();
        StringBuilder consonants = new StringBuilder();
       
        for(int i=0;i<n;i++){
            if(arr[i]=='a'||arr[i]=='e'||arr[i]=='i'||arr[i]=='o'||arr[i]=='u'){
                vowels.append(arr[i]);
            }else{
                consonants.append(arr[i]);
            }
        }
        if (vowels.length() != consonants.length()) {
            System.out.println("Number of vowels and consonants are not same.");
            return;
        }
        
        StringBuilder result = new StringBuilder();
        int i = 0, j = 0;
        
        
        while (i < vowels.length() || j < consonants.length()) {
            if (i < vowels.length()) {
                result.append(vowels.charAt(i++));
            }
            if (j < consonants.length()) {
                result.append(consonants.charAt(j++));
            }
        }
        
        System.out.println("Rearranged String: " + result.toString());
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the string: ");
        String st = sc.next();
        rearranged(st);
    }
}

/*
output:
 Enter the string: asce
Rearranged String: asec
 */
