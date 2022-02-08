import { LinkedList } from '../LinkedList';

test('Linked list should have all the elements that were added to it.', () => 
{
    const linkedList = new LinkedList([1, 2, 3, 4, 5]);
    
    expect(linkedList.length).toBe(5);

    let tmp = linkedList.head;
    let i = 1;
    while (tmp) 
    {
        expect(tmp.val).toBe(i++);
        tmp = tmp.next;
    }

    expect(i).toBe(6);
});