public class ReplaceVowels {
    public static void replaceVowel(String str, char[] str1){
        char[] s = str.toCharArray();
        
        for(int i=0; i<s.length; i++) {
            for(int j=0; j<str1.length; j++) {
                if(s[i] == str1[j]) {
                    s[i] = '@';
                }
            }
            
        }
        String a = new String(s);
        System.out.println(a);


    }
    public static void main(String[] args) {

        String str = "Diksha Chaurasia";
        char[] str1 = {'a','e','i','o','u'};
        replaceVowel(str, str1);

        
    }

}
// D@ksh@ Ch@@r@s@@