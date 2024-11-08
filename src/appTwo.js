// Functional approach for my BST.
class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = buildTree(prepareArrayForBuild(array));
    }
}

function prepareArrayForBuild(array) {
    let duplicateFreeArray = [...new Set(array)];
    return duplicateFreeArray.sort((a, b) => a - b);
}
function buildTree(array, start = 0, end = array.length - 1) {
    if (array.length === 0) return null;  // Base case for empty array (empty tree)
    if (array.length === 1) return new Node(array[0]);  // Single element, create a tree with that node

    if (start > end) return null;

    // Find middle element.
    let mid = start + Math.floor((end - start) / 2);

    // Create root node
    let root = new Node(array[mid]);

    // Create left and right subtrees.
    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
}

function insert(value, currentNode) {
    // If currentNode is null, return a new node with the value.
    if (currentNode === null) {
        return new Node(value);
    }

    // Handle duplicates: if value equals currentNode's value, return the currentNode.
    if (value === currentNode.value) {
        return currentNode;
    }

    // Insert into the left or right subtree based on value comparison.
    if (value < currentNode.value) {
        // If the left child is null, insert the value; otherwise, recurse into the left subtree.
        if (currentNode.left === null) {
            currentNode.left = new Node(value); // Insert in left subtree.
        } else {
            currentNode.left = insert(value, currentNode.left); // Recur on left subtree.
        }
    } else if (value > currentNode.value) {
        // If the right child is null, insert the value; otherwise, recurse into the right subtree.
        if (currentNode.right === null) {
            currentNode.right = new Node(value); // Insert in right subtree.
        } else {
            currentNode.right = insert(value, currentNode.right); // Recur on right subtree.
        }
    }

    return currentNode; // Return the current node, maintaining the structure.
}

function deleteItem(value, currentNode) {
    // Base case: If the node is null, return null (value not found).
    if (currentNode === null) return null;

    // Traverse to the correct node for deletion.
    if (value < currentNode.value) {
        currentNode.left = deleteItem(value, currentNode.left); // Recursively delete in the left subtree.
    } else if (value > currentNode.value) {
        currentNode.right = deleteItem(value, currentNode.right); // Recursively delete in the right subtree.
    }

    // Node found: Handle the three deletion cases.
    if (value === currentNode.value) {
        // Case 1: Leaf node (no children).
        if (currentNode.left === null && currentNode.right === null) {
            return null;
        }

        // Case 2: Node with only one child.
        if (currentNode.left === null) {
            return currentNode.right; // Return the right child to replace the node.
        }
        if (currentNode.right === null) {
            return currentNode.left; // Return the left child to replace the node.
        }

        // Case 3: Node with two children.
        // Find the successor node (the smallest node in the right subtree).
        const successorNode = getSuccessor(currentNode);
        currentNode.value = successorNode.value; // Replace node data with successor's data.
        currentNode.right = deleteItem(successorNode.value, currentNode.right); // Remove successor node.
    }

    return currentNode; // Return the updated node to maintain the tree structure.
}

// Helper function to find the successor node.
function getSuccessor(node) {
    let successor = node.right;
    while (successor && successor.left !== null) {
        successor = successor.left;
    }
    return successor;
}

function find(value, currentNode) {
    // Base case: If the current node is null, return null (value not found).
    if (currentNode === null) return null;

    // If the value is found, return the current node.
    if (value === currentNode.value) {
        return currentNode;
    }

    // Traverse left or right based on the value comparison.
    if (value < currentNode.value) {
        return find(value, currentNode.left);  // Search in the left subtree.
    } else {
        return find(value, currentNode.right);  // Search in the right subtree.
    }
}

function levelOrderIterative(callback, rootNode) {
    // Ensure function is called with a callback.
    if (!callback) throw new Error("A callback is required to run this method!");
    if (typeof callback !== 'function') throw new Error("A callback provided must be a function!");

    // Base case if root node is null exit traversal.
    if (rootNode === null) return;

    let nodeQueue = [];
    nodeQueue.push(rootNode);

    while (nodeQueue.length) {
        // Get first node from queue, remove it, process its data via callback and enqueue its children.
        let currentNode = nodeQueue.shift();
        callback(currentNode.value);
        if (currentNode.left !== null) nodeQueue.push(currentNode.left);
        if (currentNode.right !== null) nodeQueue.push(currentNode.right);
    }
}

function levelOrderRecursive(callback, rootNode) {
    // Ensure function is called with a callback.
    if (!callback) throw new Error("A callback is required to run this method!");
    if (typeof callback !== 'function') throw new Error("A callback provided must be a function!");

    // Base case if root node is null exit traversal.
    if (rootNode === null) return;

    const levelsInTree = treeHeight(rootNode) + 1;
    let levelTraversalCounter = 0;

    while (levelTraversalCounter < levelsInTree) {
        recursiveLevelOrderTraverser(levelTraversalCounter, callback, rootNode);
        levelTraversalCounter++;
    }
}

function recursiveLevelOrderTraverser(targetLevel, callback, currentNode, currentLevel = 0) {
    // If the node is null, just return.
    if (currentNode === null) return;

    // Base case: If we've reached the target level, call the callback.
    if (currentLevel === targetLevel) {
        callback(currentNode.value);
        return;
    }

    // Traverse left and right subtrees with incremented level.
    recursiveLevelOrderTraverser(targetLevel, callback, currentNode.left, currentLevel + 1);
    recursiveLevelOrderTraverser(targetLevel, callback, currentNode.right, currentLevel + 1);
}

function treeHeight(currentNode) {
    if (currentNode === null) return -1;  // Base case for empty node
    let leftHeight = treeHeight(currentNode.left);
    let rightHeight = treeHeight(currentNode.right);
    return Math.max(leftHeight, rightHeight) + 1;
}

function height(value, currentNode) {
    if (currentNode === null) return -1;  // Base case for empty node

    let leftHeight = height(value, currentNode.left);
    let rightHeight = height(value, currentNode.right);

    let largestOfHeights = Math.max(leftHeight, rightHeight) + 1;

    if (value === currentNode.value) return largestOfHeights;

    return Math.max(leftHeight, rightHeight);
}

function depth(nodeData, currentNode) {
    // Base case if root is null, return -1.
    if (currentNode === null) return -1;

    // Base case if node is found, return 0.
    if (nodeData === currentNode.data) return 0;

    // Handle left and right sub-branches.
    if (nodeData < currentNode.data) return 1 + depth(nodeData, currentNode.left);
    if (nodeData > currentNode.data) return 1 + depth(nodeData, currentNode.right);
}

// inOrder Traversal with callback check and rootNode passed as argument
function inOrder(callback, rootNode) {
    if (!callback) throw new Error("A callback is required to run this method!");
    if (typeof callback !== 'function') throw new Error("A callback provided must be a function!");

    // Perform the recursive in-order traversal
    inOrderTraverse(callback, rootNode);
}

// Helper function to recursively traverse the tree (left -> node -> right)
function inOrderTraverse(callback, currentNode) {
    if (currentNode === null) return;

    if (currentNode.left) inOrderTraverse(callback, currentNode.left);
    callback(currentNode.data);
    if (currentNode.right) inOrderTraverse(callback, currentNode.right);
}

// preOrder Traversal with callback check and rootNode passed as argument
function preOrder(callback, rootNode) {
    if (!callback) throw new Error("A callback is required to run this method!");
    if (typeof callback !== 'function') throw new Error("A callback provided must be a function!");

    // Perform the recursive pre-order traversal
    preOrderTraverse(callback, rootNode);
}

// Helper function to recursively traverse the tree (node -> left -> right)
function preOrderTraverse(callback, currentNode) {
    if (currentNode === null) return;

    callback(currentNode.data);
    if (currentNode.left) preOrderTraverse(callback, currentNode.left);
    if (currentNode.right) preOrderTraverse(callback, currentNode.right);
}

// postOrder Traversal with callback check and rootNode passed as argument
function postOrder(callback, rootNode) {
    if (!callback) throw new Error("A callback is required to run this method!");
    if (typeof callback !== 'function') throw new Error("A callback provided must be a function!");

    // Perform the recursive post-order traversal
    postOrderTraverse(callback, rootNode);
}

// Helper function to recursively traverse the tree (left -> right -> node)
function postOrderTraverse(callback, currentNode) {
    if (currentNode === null) return;

    if (currentNode.left) postOrderTraverse(callback, currentNode.left);
    if (currentNode.right) postOrderTraverse(callback, currentNode.right);
    callback(currentNode.data);
}

// Function to check if the tree is balanced
function isBalanced(root) {
    if (root === null) {
      return true; // An empty tree is balanced
    }
    
    // Get the height of the left and right subtrees
    const leftHeight = treeHeight(root.left);
    const rightHeight = treeHeight(root.right);
    
    // Check if the height difference is greater than 1
    const heightDiff = Math.abs(leftHeight - rightHeight);
    if (heightDiff > 1) {
      return false; // If the difference is greater than 1, the tree is unbalanced
    }
  
    // Recursively check the left and right subtrees
    return isBalanced(root.left) && isBalanced(root.right);
  }

    function rebalance(unbalancedTree) {
        if (unbalancedTree === null || isBalanced(unbalancedTree)) return unbalancedTree;
        let newArray = [];
        function populateNewArray (value) {
            newArray.push(value);
        }
        inOrder(populateNewArray, unbalancedTree.root);
        return buildTree(prepareArrayForBuild(newArray));
    }

    const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    const testTree = new Tree(testArray).root;
    
    const prettyPrint = (node, prefix = "", isLeft = true) => {
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
    
    prettyPrint(testTree);