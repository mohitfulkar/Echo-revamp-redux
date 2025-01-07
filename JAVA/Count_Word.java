import java.util.*;

public class Count_Word {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a string:");
        String str = sc.nextLine();
        counting_word(str);
    }

    public static void counting_word(String str) {
        String[] words = str.trim().split("\\s+");
        System.out.println("String contains " + words.length + " word(s).");
        // Brute Force approch !!!
        // int n=str.length();
        //  int count=0;
        //  for(int i=0;i<n;i++){
        //  if(str.charAt(i)== ' '){
        //     count++;
        //  }
        // }
        //  System.out.println("String contains " + count + "words");

    }
}

