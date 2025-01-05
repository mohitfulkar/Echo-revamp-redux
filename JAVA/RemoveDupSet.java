package ArrayProblem;

import java.util.HashSet;
import java.util.Set;

public class RemoveDupSet {
    Set<Integer> remove(int[] arr){
        Set <Integer> s = new HashSet<>();
        for (int ele:arr) {
            s.add(ele);
        }
        return s;
    }
    public static void main(String[] args) {
        int[] arr = {23,4,5,6,2,9,8,8,8,23};
        RemoveDupSet rds = new RemoveDupSet();
        Set<Integer> result = rds.remove(arr);
        System.out.println(result);
    }
}
