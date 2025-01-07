package StringProblem;

import java.util.Scanner;

public class RemoveVowels {
    public String remove_str(String str){
        String str1 = "";
        for (int i = 0; i < str.length(); i++) {
            boolean checkVowel =
                    str.charAt(i)!='a' &&
                    str.charAt(i)!='e' &&
                    str.charAt(i)!='i' &&
                    str.charAt(i)!='o' &&
                    str.charAt(i)!='u' &&
                    str.charAt(i)!='A' &&
                    str.charAt(i)!='E' &&
                    str.charAt(i)!='I' &&
                    str.charAt(i)!='O' &&
                    str.charAt(i)!='U';
            if(checkVowel){
                str1+=str.charAt(i);
            }
        }
        return str1;
    }
    public static void main(String[] args) {
        RemoveVowels rv = new RemoveVowels();
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the string ");
        String input  = sc.nextLine();
        String removedStr = rv.remove_str(input);
        System.out.println(removedStr);
    }
}
