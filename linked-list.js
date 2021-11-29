/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
		this.tail = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (const val of vals) this.push(val);
	}

	/** push(val): add new value to end of list. */

	push(val) {
		const newNode = new Node(val);
		if (!this.head) this.head = newNode;
		else {
			let currentNode = this.head;
			while (currentNode.next) {
				currentNode = currentNode.next;
			}
			currentNode.next = newNode;
		}
		this.tail = newNode;
		this.length++;
	}

	/** unshift(val): add new value to start of list. */

	unshift(val) {
		const newNode = new Node(val);
		const nextNode = this.head;
		this.head = newNode;
		this.head.next = nextNode;
		if (!this.tail) this.tail = newNode;
		this.length++;
	}

	/** pop(): return & remove last item. */

	pop() {
		if (!this.length) throw new Error("can't remove from empty list");
		const oldTailVal = this.tail.val;
		let currentNode = this.head;
		while (currentNode.next && currentNode.next !== this.tail) {
			currentNode = currentNode.next;
		}
		this.tail = currentNode;
		this.length--;
		if (!this.length) {
			this.head = null;
			this.tail = null;
		}
		return oldTailVal;
	}

	/** shift(): return & remove first item. */

	shift() {
		if (!this.length) throw new Error("can't remove from empty list");
		const oldHeadVal = this.head.val;
		this.head = this.head.next;
		this.length--;
		if (!this.length) this.tail = null;
		return oldHeadVal;
	}

	/** getAt(idx): get val at idx. */

	getAt(idx) {
		if (typeof idx !== "number")
			throw new Error("index must be a number");
		if (idx < 0 || idx > this.length - 1)
			throw new Error("index not in range");
		let currentNode = this.head;
		let count = 0;
		while (count !== idx) {
			currentNode = currentNode.next;
			count++;
		}
		return currentNode.val;
	}

	/** setAt(idx, val): set val at idx to val */

	setAt(idx, val) {
		if (typeof idx !== "number")
			throw new Error("index must be a number");
		if (idx < 0 || idx > this.length - 1)
			throw new Error("index not in range");
		let currentNode = this.head;
		let count = 0;
		while (count !== idx) {
			currentNode = currentNode.next;
			count++;
		}
		currentNode.val = val;
	}

	/** insertAt(idx, val): add node w/val before idx. */

	insertAt(idx, val) {
		if (typeof idx !== "number")
			throw new Error("index must be a number");
		if (idx < 0 || idx > this.length)
			throw new Error("index not in range");
		if (idx === 0) return this.unshift(val);
		if (idx === this.length) return this.push(val);
		const newNode = new Node(val);
		let prevNode = this.head;
		let count = 0;
		while (count !== idx - 1) {
			prevNode = prevNode.next;
			count++;
		}
		newNode.next = prevNode.next;
		prevNode.next = newNode;
		this.length++;
	}

	/** removeAt(idx): return & remove item at idx, */

	removeAt(idx) {
		if (typeof idx !== "number")
			throw new Error("index must be a number");
		if (idx < 0 || idx >= this.length)
			throw new Error("index not in range");
		if (idx === 0) return this.shift();
		if (idx === this.length - 1) return this.pop();
		let prevNode = this.head;
		let count = 0;
		while (count !== idx - 1) {
			prevNode = prevNode.next;
			count++;
		}
		const oldNode = prevNode.next;
		prevNode.next = oldNode.next;
		this.length--;
		return oldNode.val;
	}

	/** average(): return an average of all values in the list */

	average() {
		if (this.length === 0) return 0;
		let total = 0;
		let currentNode = this.head;
		while (currentNode) {
			total += currentNode.val;
			currentNode = currentNode.next;
		}
		return total / this.length;
	}
}

module.exports = LinkedList;
