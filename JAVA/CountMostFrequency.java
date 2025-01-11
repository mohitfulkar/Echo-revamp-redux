import java.util.Scanner;

 public class CountMostFrequency{
   public static char findFrequency(String str){
     
     if(str == null || str.isEmpty()){
       return '\0';
     }
  // Convert string to lowercase to make the count case-insensitive
    str = str.toLowerCase();
    
  // Array to store frequency of each ASCII character
     int[] frequency = new int[256];
     
  // Iterate through the string to count frequencies
     for(int i=0;i<str.length();i++){
       char c = str.charAt(i);
       if(!Character.isWhitespace(c) ){
         frequency[c]++;
       }
     }
     
  // Find the character with the maximum frequency
     char mostFrequentChar = '\0';
     int maxFrequency = 0;
     for(int i = 0; i<frequency.length; i++){
       if(frequency[i] > maxFrequency){
         maxFrequency = frequency[i];
         mostFrequentChar = (char)i;
       }
     }
     return mostFrequentChar;
   }
   public static void main(String[] args){
     
     System.out.print("Enter a String : ");
     Scanner sc = new Scanner(System.in);
     String str = sc.nextLine();
     System.out.print("The most frequent character is : "+findFrequency(str));
  // * suppose in String Two elements are same frequency then return alphabetical order. 
   }
 }
