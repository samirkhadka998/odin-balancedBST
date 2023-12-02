class Node{
    constructor(data){
        this.data = data,
        this.left = null,
        this.right = null
    }
}

class Tree{
    constructor(root){
        this.root = root;
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
    tree.root = convertToBalanceTree(arr,0, arr.length - 1);
    console.log(tree.root);
    prettyPrint(tree.root)
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
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };