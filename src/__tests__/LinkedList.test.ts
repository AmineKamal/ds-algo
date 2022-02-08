import { LinkedList } from '../LinkedList';

function verifyLinkedList(linkedList: LinkedList<number>, expectedLength: number) 
{
  expect(linkedList.length).toBe(expectedLength);

  let tmp = linkedList.head;
  let i = 1;
  while (tmp) {
    expect(tmp.val).toBe(i++);
    tmp = tmp.next;
  }
  expect(i).toBe(expectedLength + 1);
  
  i = expectedLength;
  tmp = linkedList.tail;
  while (tmp) {
    expect(tmp.val).toBe(i--);
    tmp = tmp.prev;
  }
  expect(i).toBe(0);
}

test('Linked list should have all the elements that were added to it.', () => {
  const linkedList = new LinkedList([1, 2, 3, 4, 5]);
  verifyLinkedList(linkedList, 5);
});


test('Linked list should get the element at the given index', () => {
  const linkedList = new LinkedList([1, 2, 3, 4, 5]);

  expect(linkedList.length).toBe(5);

  for (let i = 0; i < linkedList.length; i++) 
  {
    expect(linkedList.get(i)!.val).toBe(i + 1);
  }

  expect(linkedList.get(10)).toBe(undefined);
});

test('Linked list should undhift the values correctly', () => {
  const linkedList = new LinkedList<number>();
  linkedList.unshift(5, 4, 3, 2, 1);

  verifyLinkedList(linkedList, 5);
});

test('Linked list should push the values correctly', () => {
  const linkedList = new LinkedList<number>();
  linkedList.push(1, 2, 3, 4, 5);
  
  verifyLinkedList(linkedList, 5);
});

test('Linked list should insert the values correctly', () => {
  const linkedList = new LinkedList<number>([1, 2, 3, 4, 7]);
  linkedList.insert(4, 5);
  linkedList.insert(5, 6);

  verifyLinkedList(linkedList, 7);
});

test('Linked list should shift the value correctly', () => {
  const linkedList = new LinkedList<number>([0, 1, 1, 2, 3, 4, 5]);
  linkedList.shift();
  linkedList.shift();
  
  verifyLinkedList(linkedList, 5);
});

test('Linked list should pop the value correctly', () => {
  const linkedList = new LinkedList<number>([1, 2, 3, 4, 5, 6, 7, 8]);
  linkedList.pop();
  linkedList.pop();
  
  verifyLinkedList(linkedList, 6);
});

test('Linked list should delete the value correctly', () => {
  const linkedList = new LinkedList<number>([1, 2, 2, 3, 4, 5, 5, 6, 7, 8]);
  linkedList.delete(1);
  linkedList.delete(5);
  
  verifyLinkedList(linkedList, 8);
});

test('Linked list should delete the node correctly', () => {
  const linkedList = new LinkedList<number>([1, 2, 2, 3, 4, 5, 5, 6, 7, 8]);
  
  const n1 = linkedList.get(1);
  linkedList.deleteNode(n1!);

  const n2 = linkedList.get(5);
  linkedList.deleteNode(n2!);
  
  verifyLinkedList(linkedList, 8);
});

test('Linked list should convert to an array correctly', () => {
  const linkedList = new LinkedList<number>([1, 2, 3, 4, 5, 6, 7, 8]);
  const array = linkedList.toArray();

  for (let i = 0; i < array.length; i++) 
  {
    expect(array[i]).toBe(i + 1);
  }
});
