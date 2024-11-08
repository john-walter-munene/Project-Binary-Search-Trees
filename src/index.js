import { Tree, prettyPrint } from "./app";

function randomNumArray(min, max) {
    let numbersCount = 15; // You can adjust the number of elements
    let array = [];
    for (let counter = 0; counter < numbersCount; counter++) {
        // Generating random integers between min and max
        array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return array;
}

const randomNumbers = randomNumArray(0, 100);
console.log(randomNumbers);
const testTree = new Tree(randomNumbers);
prettyPrint(testTree.root);
console.log(testTree.isBalanced());
// console.log("Iterative Level Order Traversal");
// testTree.levelOrderIterative(console.log);
// console.log("Recursive level order traversal");
// testTree.levelOrderRecursive(console.log);
// console.log("Preorder traversal");
// testTree.preOrder(console.log);
// console.log("Post order traversal");
// testTree.postOrder(console.log);
// console.log("In Order Traversal");
// testTree.inOrder(console.log);
let newRandomNumbers = randomNumArray(100, 200);
newRandomNumbers.forEach(number => testTree.insert(number));
console.log(testTree.isBalanced());
testTree.rebalance();
console.log(testTree.isBalanced());
prettyPrint(testTree.root);
// console.log("Iterative Level Order Traversal");
// testTree.levelOrderIterative(console.log);
// console.log("Preorder traversal");
// testTree.preOrder(console.log);
// console.log("Post order traversal");
// testTree.postOrder(console.log);
// console.log("In Order Traversal");
// testTree.inOrder(console.log);