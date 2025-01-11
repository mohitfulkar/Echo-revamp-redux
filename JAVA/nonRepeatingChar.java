import java.util.*;

class nonRepeatingChar {
    public static void nonRepeating(String str) {
        char[] arr = str.toCharArray();
        int n = arr.length;

        boolean[] repeated = new boolean[n]; // Default false

        for (int i = 0; i < n; i++) {
            if (repeated[i]) {
                continue;
            }
            boolean isRepeated = false;
            for (int j = 0; j < n; j++) {
                if (i != j && arr[i] == arr[j]) {
                    isRepeated = true;
                    repeated[j] = true; 
                }
            }
            if (!isRepeated) {
                // First non-repeating character found
                System.out.println("First non-repeating character: " + arr[i]);
                return;
            }
        }
        System.out.println("No non-repeating character found.");
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the string: ");
        String st = sc.next();
        nonRepeating(st);
    }
}

/*
 Output:
 Enter the string: fastforward
First non-repeating character: s

 Output:
 Enter the string: ffaasstt
No non-repeating character found.
 */