package ArrayProblem;
import java.util.ArrayList;
import java.util.List;

public class RemoveDupList {
    public List<Integer> remove_dup(int[] arr){
        int n = arr.length;
        List<Integer> list = new ArrayList<>();
        for(int i =0;i<n;i++){
            if(!list.contains(arr[i])){
                list.add(arr[i]);
            }
        }
        return list;
    }

    public static void main(String[] args) {
        RemoveDupList rsl = new RemoveDupList();
        int[] arr = {1,4,3,2,2,2,};
        List<Integer> newlist = rsl.remove_dup(arr);
        System.out.println(newlist);

    }
}
