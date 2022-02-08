import { ListNode } from './ListNode';

export class LinkedList<T> {
  private _head?: ListNode<T>;
  private _tail?: ListNode<T>;
  private _length = 0;

  public constructor(values?: T[]) {
    if (values) this.push(...values);
  }

  /**
   * Returns the head of the linked list
   *
   * Complexity - O(1)
   */
  public get head() {
    return this._head;
  }

  /**
   * Returns the tail of the linked list
   *
   * Complexity - O(1)
   */
  public get tail() {
    return this._tail;
  }

  /**
   * Returns the size of the linked list
   *
   * Complexity - O(1)
   */
  public get length() {
    return this._length;
  }

  /**
   * Retrieves the element at the given index
   *
   * Complexity - O(n)
   * @param index
   */
  public get(index: number) {
    if (index < 0 || index >= this._length) return undefined;

    if (index >= this._length - index) {
      // Start from tail
      let i = this._length - 1;
      let tmp = this._tail;

      while (index !== i) {
        i--;
        tmp = tmp!.prev;
      }

      return tmp;
    } else {
      // Start from head
      let i = 0;
      let tmp = this._head;

      while (index !== i) {
        i++;
        tmp = tmp!.next;
      }

      return tmp;
    }
  }

  /**
   * Appends the values at the start of the linked list
   *
   * Complexity - O(1) for each element -> O(k) where k is the number of elements to add
   * @param values
   */
  public unshift(...values: T[]) {
    for (const val of values) {
      const node = new ListNode(val);

      if (this._length === 0) {
        this._head = node;
        this._tail = node;
        this._length++;
        continue;
      }

      node.next = this._head;
      this._head!.prev = node;
      this._head = node;
      this._length++;
    }

    return this._length;
  }

  /**
   * Appends the values at the end of the linked list
   *
   * Complexity - O(1) for each element -> O(k) where k is the number of elements to add
   * @param values
   */
  public push(...values: T[]) {
    for (const val of values) {
      const node = new ListNode(val);

      if (this._length === 0) {
        this._head = node;
        this._tail = node;
        this._length++;
        continue;
      }

      node.prev = this._tail;
      this._tail!.next = node;
      this._tail = node;
      this._length++;
    }

    return this._length;
  }

  /**
   * Appends the value at the given index
   *
   * Complexity - O(n)
   * @param index
   * @param val
   */
  public insert(index: number, val: T): number {
    if (index > this._length) return this._length;
    if (index === 0) return this.unshift(val);
    if (index === this._length) return this.push(val);

    const newNode = new ListNode(val);
    const node = this.get(index - 1)!;

    newNode.next = node!.next;
    newNode.prev = node;
    node.next!.prev = newNode;
    node.next = newNode;
    this._length++;

    return this._length;
  }

  /**
   * Removes the first element of the list
   *
   * Complexity - O(1)
   */
  public shift() {
    if (!this._head) return undefined;

    const node = this._head;
    const newHead = this._head!.next;
    if (newHead) {
      newHead.prev = undefined;
    }

    this._head!.next = undefined;
    this._head = newHead;
    this._length--;

    return node;
  }

  /**
   * Removes the last element of the list
   *
   * Complexity - O(1)
   */
  public pop() {
    if (!this._tail) return undefined;

    const node = this._tail;
    const newTail = this._tail!.prev;
    if (newTail) {
      newTail.next = undefined;
    }

    this._tail!.prev = undefined;
    this._tail = newTail;
    this._length--;

    return node;
  }

  /**
   * Deletes the element at the given index
   *
   * Complexity - O(n)
   * @param index
   */
  public delete(index: number) {
    if (index >= this._length || index < 0) return null;
    if (index === 0) return this.shift();
    if (index === this._length - 1) return this.pop();

    if (index > 0 && index < this._length - 1) {
      return this.deleteNode(this.get(index)!);
    }

    return null;
  }

  /**
   * Removes the given node from the list
   *
   * Complexity - O(1)
   * @param node
   */
  public deleteNode(node: ListNode<T>) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
    node.next = undefined;
    node.prev = undefined;
    this._length--;

    return node;
  }

  /**
   * Converts the linked list into an array
   *
   * Complexity - O(n)
   */
  public toArray(): T[] {
    if (this._length === 0) return [];

    const array: T[] = [];

    let tmp = this._head!;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this._length; i++) {
      array.push(tmp.val);
      tmp = tmp.next!;
    }

    return array;
  }
}
