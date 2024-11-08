# Balanced Binary Search Tree (BST)

This project provides an object-oriented JavaScript implementation of a balanced Binary Search Tree (BST). It includes key operations and methods to manage the BST while maintaining balance. A functional programming version of the solution is also available in the repository.

## Features

### Tree Initialization
- **`new Tree(array)`**: Constructs a balanced BST from a given array, removing duplicates and sorting elements.

### Core Methods
- **Insert**: `insert(nodeData)` – Inserts a new node.
- **Delete**: `delete(nodeData)` – Deletes a specified node, handling cases for leaf nodes, single children, or two children.
- **Find**: `find(nodeData)` – Searches for a node with the specified data.
- **Depth**: `depth(nodeData)` – Returns the depth of a node within the tree.
- **Height**: `height(nodeData)` – Returns the height of the tree or a given node.
- **Check Balance**: `isBalanced()` – Checks if the tree is balanced.
- **Rebalance**: `rebalance()` – Rebalances the tree if it becomes unbalanced.

### Traversal Methods
- **In-Order Traversal**: `inOrder(callback)` – Visits nodes in ascending order.
- **Pre-Order Traversal**: `preOrder(callback)` – Visits each node before its children.
- **Post-Order Traversal**: `postOrder(callback)` – Visits each node after its children.
- **Level-Order Traversal**: 
  - `levelOrderIterative(callback)` – Iterative level-order traversal.
  - `levelOrderRecursive(callback)` – Recursive level-order traversal.

All the traversal methods must be provided with a callback function to process the data on each node.

## Usage Example
To create and print a balanced BST:

```javascript
const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(testArray);
prettyPrint(tree.root);
```