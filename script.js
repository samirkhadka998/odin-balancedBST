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

let arr =  [1, 7, 4];
buildTree(arr)
function buildTree(arr){
    //remove duplicate
    arr = [...new Set(arr)];

    //sort
    arr = (mergeSort(arr));
    //return 0 level node
    console.log(arr)
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