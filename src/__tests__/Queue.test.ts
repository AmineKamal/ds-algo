import { Queue } from "../Queue"

test('Queue should work as expected', () => {
    const queue = new Queue<number>();

    expect(queue.peek()).toBe(undefined);
    expect(queue.length).toBe(0);

    const values = [1, 10, 20, 30];

    for (const val of values) 
    {
        const l = queue.length;
        queue.enqueue(val);
        expect(queue.length).toBe(l + 1);
    }

    for (const val of values) 
    {
        const l = queue.length;
        expect(queue.peek()).toBe(val);
        expect(queue.dequeue()).toBe(val);
        expect(queue.length).toBe(l - 1);
    }

    expect(queue.peek()).toBe(undefined);
    expect(queue.length).toBe(0); 
});