# 11 Coding Patterns for Interviews: Java Examples
Here are easy Java coding examples for each of the 11 essential coding patterns for interviews:
## 1. Two Pointers
Imagine having two runners on a track. You can solve certain problems by moving these runners strategically:  
- One pointer might start at the beginning, another at the end.
- They can move together, in opposite directions, or skip elements based on the problem.
- This is useful for finding pairs or triplets in sorted arrays or linked lists.
### Problem:
- Find if there is a pair in the array that sums up to a target value.
```java
public class TwoPointers {
    public static boolean hasPairWithSum(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int sum = arr[left] + arr[right];
            if (sum == target) {
                return true;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 6};
        int target = 9;
        System.out.println(hasPairWithSum(arr, target)); // Output: true
    }
}
```
## 2. Sliding Window
Think of a window sliding across a data stream (like an array or string). You analyze the elements within the window:  
- The window can grow or shrink based on conditions.
- This is helpful for finding the longest substring with specific properties or the maximum sum within a subarray of a certain size.
### Problem:
- Find the maximum sum of a subarray of size k.
```java
public class SlidingWindow {
    public static int maxSumSubarray(int[] arr, int k) {
        int maxSum = 0, windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }
        maxSum = windowSum;
        for (int i = k; i < arr.length; i++) {
            windowSum += arr[i] - arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }

    public static void main(String[] args) {
        int[] arr = {2, 1, 5, 1, 3, 2};
        int k = 3;
        System.out.println(maxSumSubarray(arr, k)); // Output: 9
    }
}
```
## 3. In-place Reversal of a Linked List
Imagine reversing the order of nodes in a linked list, but without creating a new list. You manipulate the existing pointers:  
- You change the connections between nodes to reverse the order.
- This is efficient because you avoid using extra memory.
### 간단정리:
연결 리스트(Linked List)는 자료구조의 동작 방식에 따라 FIFO(First In, First Out) 또는 LIFO(Last In, First Out) 둘 다 가능하다.
- FIFO (First In, First Out) - 큐(Queue)로 사용
- LIFO (Last In, First Out) - 스택(Stack)으로 사용
### Tip:
- 1 -> 2 -> 3 -> 4 -> 5: 연결리스트가 이렇게 생겼으면 1이 head고 5가 tail임 (먼저들어간놈이 tail이 됨)
- 생성자에 대해서 ↓
```java
class ListNode {
    int value1;
    int value2;

    // 1️⃣ 두 개의 값을 받는 생성자
    ListNode(int value1, int value2) {
        this.value1 = value1;
        this.value2 = value2;
    }

    // 2️⃣ 하나의 값만 받는 생성자 (value2를 기본값 0으로 설정)
    ListNode(int value1) {
        this.value1 = value1;
        this.value2 = 0; // 기본값 설정
    }

    // 3️⃣ 기본 생성자 (값이 없을 경우)
    ListNode() {
        this.value1 = 0;
        this.value2 = 0;
    }

    // 객체의 내용을 출력하는 메서드
    public void printNode() {
        System.out.println("value1: " + value1 + ", value2: " + value2);
    }
}

public class Main {
    public static void main(String[] args) {
        // 1️⃣ 두 개의 값을 전달하는 생성자
        ListNode node1 = new ListNode(10, 20);
        node1.printNode(); // 출력: value1: 10, value2: 20

        // 2️⃣ 하나의 값만 전달하는 생성자 (value2는 기본값 0)
        ListNode node2 = new ListNode(30);
        node2.printNode(); // 출력: value1: 30, value2: 0

        // 3️⃣ 기본 생성자 (value1, value2 모두 0)
        ListNode node3 = new ListNode();
        node3.printNode(); // 출력: value1: 0, value2: 0
    }
}
```
### Problem:
- Reverse a linked list.
```java
class ListNode {
    int value;
    ListNode next;
    ListNode(int value) {
        this.value = value;
    }
}

public class ReverseLinkedList {
    public static ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        while (current != null) {
            ListNode next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head = reverse(head);
        while (head != null) {
            System.out.print(head.value + " "); // Output: 3 2 1
            head = head.next;
        }
    }
}
```
## 4. K-way Merge
Imagine merging multiple sorted lists into one big sorted list. Here’s the approach:
- You keep track of the current smallest element from each list.
- The overall minimum comes from whichever list has the current smallest element.
- This is useful for combining data from multiple sources efficiently.
### Problem:
- Merge k sorted arrays.
```java
import java.util.PriorityQueue;

class Node {
    int arrayIndex;
    int elementIndex;
    int value;

    Node(int arrayIndex, int elementIndex, int value) {
        this.arrayIndex = arrayIndex;
        this.elementIndex = elementIndex;
        this.value = value;
    }
}

public class KWayMerge {
    public static int[] mergeKSortedArrays(int[][] arrays) {
        PriorityQueue<Node> minHeap = new PriorityQueue<>((a, b) -> a.value - b.value);
        int totalSize = 0;

        // Initialize heap with the first element of each array
        for (int i = 0; i < arrays.length; i++) {
            if (arrays[i].length > 0) {
                minHeap.add(new Node(i, 0, arrays[i][0]));
                totalSize += arrays[i].length;
            }
        }

        int[] result = new int[totalSize];
        int resultIndex = 0;

        while (!minHeap.isEmpty()) {
            Node node = minHeap.poll();
            result[resultIndex++] = node.value;

            if (node.elementIndex + 1 < arrays[node.arrayIndex].length) {
                minHeap.add(new Node(node.arrayIndex, node.elementIndex + 1, arrays[node.arrayIndex][node.elementIndex + 1]));
            }
        }

        return result;
    }

    public static void main(String[] args) {
        int[][] arrays = {
                {1, 4, 7},
                {2, 5, 8},
                {3, 6, 9}
        };
        int[] result = mergeKSortedArrays(arrays);
        for (int num : result) {
            System.out.print(num + " "); // Output: 1 2 3 4 5 6 7 8 9
        }
    }
}
```
## 5. Dynamic Programming
## 6. Matrices
## 7. Tree Depth First Search
## 8. BFS
## 9. Hash Maps
## 10. Fast and Slow pointer
## 11. Merge Interval








