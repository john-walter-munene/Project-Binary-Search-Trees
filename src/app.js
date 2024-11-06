class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = this.mergeSort(this.removeDuplicate(array));
        this.root = this.buildTree(this.array);
    }

    removeDuplicate(array) {
        // Exit if this is not an array.
        if (!Array.isArray(array)) return;
        return [...new Set(array)];
    }

    mergeSort(array, low = 0, high = array.length - 1) {
        if (low < high) {

            // Find middle point.
            let middle = Math.floor((low + high) / 2);
    
            // Recursive sort both halves.
            this.mergeSort(array, low, middle);
            this.mergeSort(array, middle + 1, high);
    
            // Create copies of the subarrays
            let leftArray = array.slice(low, middle + 1);
            let rightArray = array.slice(middle + 1, high + 1);
    
            // Merge the arrays
            let i = 0, j = 0, k = low;
            while (i < leftArray.length && j < rightArray.length) {
                if (leftArray[i] <= rightArray[j]) {
                    array[k++] = leftArray[i++];
                } else {
                    array[k++] = rightArray[j++];
                }
            }
    
            // Copy remaining elements of leftArray, if any
            while (i < leftArray.length) {
                array[k++] = leftArray[i++];
            }
    
             // Copy remaining elements of rightArray, if any
            while (j < rightArray.length) {
                array[k++] = rightArray[j++];
            }
        }
    
        return array;
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) return null;

        // Find middle element.
        let mid = start + Math.floor((end - start) / 2);

        // Create root node
        let root = new Node(array[mid]);

        // Create left and right subtrees.
        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }

    insert(nodeData, currentNode = this.root) {
        // If the tree is empty, initialize root with a new node.
        if (this.root === null) {
            this.root = new Node(nodeData);
            return this.root;
        }
    
        // If currentNode is null, return a new node (should not happen in typical usage).
        if (currentNode === null) {
            return new Node(nodeData);
        }
    
        // Handle duplicates.
        if (nodeData === currentNode.data) {
            return currentNode;
        } 
    
        // Insert into the left or right subtree based on nodeData comparison.
        if (nodeData < currentNode.data) {
            if (currentNode.left === null) {
                currentNode.left = new Node(nodeData); // Insert in left subtree.
            } else {
                this.insert(nodeData, currentNode.left); // Recur on left subtree.
            }
        } else if (nodeData > currentNode.data) {
            if (currentNode.right === null) {
                currentNode.right = new Node(nodeData); // Insert in right subtree.
            } else {
                this.insert(nodeData, currentNode.right); // Recur on right subtree.
            }
        }
    
        return currentNode;
    }    
    
    delete(nodeData, currentNode = this.root) {
        // Base case: If the node is null, return null (nodeData not found).
        if (currentNode === null) return null;
    
        // Traverse to the correct node for deletion.
        if (nodeData < currentNode.data) {
            currentNode.left = this.delete(nodeData, currentNode.left);  // Recursively delete in the left subtree.
        } else if (nodeData > currentNode.data) {
            currentNode.right = this.delete(nodeData, currentNode.right);  // Recursively delete in the right subtree.
        } 
    
        // Node found: Handle the three deletion cases.
        if (nodeData === currentNode.data) {
            // Case 1: Leaf node (no children).
            if (currentNode.left === null && currentNode.right === null) {
                return null;
            }
    
            // Case 2: Node with only one child.
            if (currentNode.left === null) {
                return currentNode.right;
            }
            if (currentNode.right === null) {
                return currentNode.left;
            }
    
            // Case 3: Node with two children.
            let successorNode = this.getSuccessor(currentNode);
            currentNode.data = successorNode.data;
            currentNode.right = this.delete(successorNode.data, currentNode.right);  // Remove successor.
        }
    
        return currentNode;  // Return the updated node to maintain the tree structure.
    }
    
    getSuccessor(currentNode) {
        let temp = currentNode.right;
        while(temp !== null && temp.left !== null) {
            temp = temp.left;
        }
        return temp;
    }

    find(nodeData, currentNode = this.root) {
        // Base case: If the current node is null, return null (nodeData not found).
        if (currentNode === null) return null;
    
        // If the nodeData is found, return the current node.
        if (nodeData === currentNode.data) {
            return currentNode;
        }
    
        // Traverse left or right based on the nodeData comparison.
        if (nodeData < currentNode.data) {
            return this.find(nodeData, currentNode.left);  // Search in the left subtree.
        } else {
            return this.find(nodeData, currentNode.right);  // Search in the right subtree.
        }
    }       

    levelOrderIterative(callback) {
        // Ensure function is called with a callback.
        if (!callback) throw new Error("A callback is required to run this method!");
        if (typeof callback !== 'function') throw new Error('A callback provided must be a function!');

        let rootNode = this.root;
        // Base case if root node is null exit traversal.
        if (rootNode === null) return;

        let nodeQueue = [];
        nodeQueue.push(rootNode);

        while(nodeQueue.length) {
            // Get first node from queue, remove it, process its data via callback and enque its children.
            let currentNode = nodeQueue.shift();
            callback(currentNode.data);
            if (currentNode.left !== null) nodeQueue.push(currentNode.left);
            if (currentNode.right !== null) nodeQueue.push(currentNode.right);
        }

    }

    levelOrderRecursive(callback) {
        // Ensure function is called with a callback.
        if (!callback) throw new Error("A callback is required to run this method!");
        if (typeof callback !== 'function') throw new Error('A callback provided must be a function!');
    
        // Base case if root node is null exit traversal.
        let currentNode = this.root;
        if (currentNode === null) return;
    
        let levelsInTree = this._treeHeight() + 1;
        let levelTraversalCounter = 0;
        while (levelTraversalCounter < levelsInTree) {
            this._recursiveLevelOrderTraverser(levelTraversalCounter, callback);
            levelTraversalCounter++;
        }
    }

    testCallBack(data) {
        console.log(data * 2); // logs double the data of the node.
    }

    _recursiveLevelOrderTraverser(targetLevel, callback, currentLevel = 0, currentNode = this.root) {
        // If the node is null, just return.
        if (currentNode === null) return;
    
        // Base case: If we've reached the target level, call the callback.
        if (currentLevel === targetLevel) {
            callback(currentNode.data);
            return;
        }
    
        // Traverse left and right subtrees with incremented level.
        this._recursiveLevelOrderTraverser(targetLevel, callback, currentLevel + 1, currentNode.left);
        this._recursiveLevelOrderTraverser(targetLevel, callback, currentLevel + 1, currentNode.right);
    }    

    _treeHeight(currentNode = this.root) {
        if (currentNode === null) return -1;  // Base case for empty node
        let leftHeight = this._heightHelper(currentNode.left);
        let rightHeight = this._heightHelper(currentNode.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(nodeData, currentNode = this.root) {
        // Base case if root is null, return -1.
        if (currentNode === null) return -1;
    
        // Base case if node is found, return 0.
        if (nodeData === currentNode.data) return 0;
        
        // Handle left and right sub-branches.
        if (nodeData < currentNode.data) return 1 + this.depth(nodeData, currentNode.left);
        if (nodeData > currentNode.data) return 1 + this.depth(nodeData, currentNode.right);
    }    
    
    height(nodeData, currentNode = this.root) {
        if (currentNode === null) return -1;  // Base case for empty node
    
        let leftHeight = this.height(nodeData, currentNode.left);
        let rightHeight = this.height(nodeData, currentNode.right);
    
        let largestOfHeights = Math.max(leftHeight, rightHeight) + 1;
    
        if (nodeData === currentNode.data) return largestOfHeights;
    
        return Math.max(leftHeight, rightHeight);
    }  
    
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