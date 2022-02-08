import { LinkedList } from "./LinkedList";

export class Queue<T> 
{
    private list: LinkedList<T> = new LinkedList();

    /**
     * Returns the size of the queue
     * 
     * Complexity - O(1)
     */
    public size() 
    {
        return this.list.size();
    }

    /**
     * Appends the element in the queue
     * 
     * Complexity - O(1)
     * @param val 
     */
    public enqueue(val: T) 
    {
        this.list.unshift(val);
    }

    /**
     * Removes the element inserted first
     * 
     * Complexity - O(1)
     */
    public dequeue() 
    {
        return this.list.pop()?.val;
    }
}