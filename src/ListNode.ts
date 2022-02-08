/**
 * Class Representing a node in a doubly linked list
 */
export class ListNode<T> {
  next?: ListNode<T>;
  prev?: ListNode<T>;

  public constructor(public val: T) {}
}
