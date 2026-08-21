// utils/PriorityQueue.js — a custom Max-Heap implementation
//
// JavaScript has no built-in PriorityQueue (unlike Java), so we build one
// ourselves using a binary heap stored in a plain array.
//
// "Max" heap: the item with the HIGHEST priorityScore is always at the root,
// which matches our use case — we always want the most urgent ticket next.

class PriorityQueue {
  constructor() {
    this.heap = []; // the array backing our entire heap structure
  }

  // --- Index math: how we navigate the tree using only array indices ---
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // --- Core operation 1: insert a new item ---
  // item must have a `.priorityScore` property (e.g. a ticket object)
  insert(item) {
    this.heap.push(item);              // step 1: add to the end
    this.heapifyUp(this.heap.length - 1); // step 2: bubble it up into place
  }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      // If the current item is bigger than its parent, they're out of order — swap
      if (this.heap[index].priorityScore > this.heap[parentIndex].priorityScore) {
        this.swap(index, parentIndex);
        index = parentIndex; // keep bubbling up from the new position
      } else {
        break; // heap property satisfied, stop
      }
    }
  }

  // --- Core operation 2: remove and return the highest-priority item ---
  extractMax() {
    if (this.heap.length === 0) return null;

    const max = this.heap[0]; // the root is always the highest priority
    const last = this.heap.pop(); // remove the last element

    if (this.heap.length > 0) {
      this.heap[0] = last;    // move the last element to the root...
      this.heapifyDown(0);    // ...then bubble it down into place
    }

    return max;
  }

  heapifyDown(index) {
    const length = this.heap.length;

    while (true) {
      const left = this.getLeftChildIndex(index);
      const right = this.getRightChildIndex(index);
      let largest = index;

      if (left < length && this.heap[left].priorityScore > this.heap[largest].priorityScore) {
        largest = left;
      }
      if (right < length && this.heap[right].priorityScore > this.heap[largest].priorityScore) {
        largest = right;
      }

      if (largest === index) break; // heap property satisfied, stop

      this.swap(index, largest);
      index = largest; // keep bubbling down from the new position
    }
  }

  // O(1) — just look at the root, don't remove it
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

module.exports = PriorityQueue;