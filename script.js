class Node{
    constructor(key){
        this.key = key,
        this.left = null,
        this.right = null
    }
}

class Tree{
    constructor(node){
        this.node = node;
    }
}

// let arr =   [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let arr = [1,2,3,4,5]
let tree = new Tree(null);
buildTree(arr)
function buildTree(arr){
    //remove duplicate
    arr = [...new Set(arr)];

    //sort
    arr = (mergeSort(arr));
    //return 0 level node
    tree.node = convertToBalanceTree(arr,0, arr.length - 1);
    console.log(tree.node);
    prettyPrint(tree.node)
}

function convertToBalanceTree(arr, start, end){
    if(start > end){
        return null;
    }

    let mid = parseInt((start + end) / 2);
        let node = new Node(arr[mid])
    node.left = convertToBalanceTree(arr, start, mid - 1);
    node.right = convertToBalanceTree(arr, mid + 1 , end);
    return node;
}

function mergeSort(arr) {
    if(arr.length == 1){
        return arr;
    }

    let mid = Math.floor(arr.length/2);
    let left = [];
    let right = [];
    left = arr.slice(0 , mid);
    right = arr.slice(mid);

    return merge(mergeSort(left) , mergeSort(right))


}

function merge(left, right) {
    let newArr= [];

    while(left.length > 0 && right.length > 0){
        if(left[0] <= right [0]){
            newArr.push(left.shift())
         }
         else{
            newArr.push(right.shift())
         }
    }

    return [...newArr, ...left, ...right];
}



function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.key}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

 InsertToBinary(6);
 InsertToBinary(3.5);
 prettyPrint(tree.node);
 tree.node = DeleteBinary(tree.node, 6);
 prettyPrint(tree.node);
 tree.node = DeleteBinary(tree.node, 4);
 prettyPrint(tree.node);
 tree.node = DeleteBinary(tree.node, 43);
 prettyPrint(tree.node);

  function InsertToBinary(value) {
     tree.node = insertRecord(tree.node, value);
  }

  function insertRecord(node ,value){
    if(node === null){
        let newNode = new Node(value);
        return newNode;
     }
    
     else if(node.key < value){
        node.right = insertRecord(node.right, value);
     }

     else if(node.key > value){
        node.left = insertRecord(node.left, value);
     }

     return node;
  }

  function DeleteBinary(node , k) {
        //Base case
        if(node == null){
            return node;
        }

        //for leaf node
        if(node.key > k){
            node.left = DeleteBinary(node.left, k);
            return node;
        }

        else if(node.key < k){
            node.right = DeleteBinary(node.right, k);
            return node;
        }
       
        //we reached to node

        //If one of the children is empty
        if(node.left == null){
            let temp = node.right;
            node = null;
            return temp;
        }

        else if(node.right == null){
            let temp = node.left;
            node = null;
            return temp;
        }

        //if both children exits
        else{

            let parent = node;
            
            let successor = node.right;

            while(successor.left != null){
                parent = successor;
                successor = successor.left;
            }

            if(parent != node){
                parent.left = successor.right;
            }
            else{
                parent.right = successor.right;
            }

            node.key = successor.key;
            return node;


        }
  }