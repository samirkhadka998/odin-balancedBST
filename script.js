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
 tree.node = DeleteBinary(tree.node, 6);
 tree.node = DeleteBinary(tree.node, 43);
 prettyPrint(tree.node);
 console.log(findNode(tree.node, 3.5))
 levelOrder(tree.node)
 inorderRecursive(tree.node)
 prettyPrint(tree.node)
 preorderRecursive(tree.node);
 postorderRecursive(tree.node)
 findDepthAndHeight(tree.node, 3.5)
 console.log(isBalanced(tree.node))

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

  function findNode(node, k) {
     if(node == null){
        return node;
     }

     if(node.key < k){
        return findNode(node.right , k)
     }
     else if (node.key > k){
        return findNode(node.left, k);
     }

     return node;
  }

  function levelOrder(root) {
        if(root == null) return;
        const queue = [];
        queue.push(root);

        while (queue.length) {
            const node = queue.shift();
            console.log(node.key);

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }

        console.log(queue);
  }

  function inorderRecursive(tree) {
    const result = [];
    function inorderTraverse(node) {
        if(!node) return;
        inorderTraverse(node.left);
        result.push(node.key);
        inorderTraverse(node.right);
        
    }

    inorderTraverse(tree);
    console.log(result);
  }
  

  function preorderRecursive(tree) {
    const result = [];
    function preorderTraverse(node) {
        if(!node) return;

        result.push(node.key);
        preorderTraverse(node.left);
        preorderTraverse(node.right)
    }

    preorderTraverse(tree);
    console.log(result)
  }

  function postorderRecursive(tree) {
    const result = [];
    function posorderTraverse(node) {
        if(!node) return;
        posorderTraverse(node.left);
        posorderTraverse(node.right);
        result.push(node.key)
    }

    posorderTraverse(tree);
    return result;
    
  }

  function findDepthAndHeight(node, k){
    if(node == null) return 0;

    let depth = -1;
    let height = -1;

    const queue = [];
    queue.push(node);
    let level = 0
    
    while (queue.length > 0) {
        const n = queue.length;
        for(let i = 0 ; i < n ; i++){
            const frontNode = queue.shift();
            if(frontNode.data === k)
                depth = level;
            if(frontNode.left !== null){
                queue.push(frontNode.left);
            }
            if(frontNode.right !== null){
                queue.push(frontNode.right);
            }
            level++;
        }

        height = level - depth - 1;
        console.log("Depth : " + depth);
        console.log("Height " + height);
    }
  }


  function height(root) {
    if(root == null) return 0;
    return Math.max(height(root.left), height(root.right)) + 1;
  }
  function isBalanced(root) {
     if(root == null) return null;

     let lh = height(root.left);
     let rh = height(root.right);

     if(Math.abs(lh - rh) <= 1 && isBalanced(root.left)== true && isBalanced(root.right) == true)
     return true;

     return false;
  }
