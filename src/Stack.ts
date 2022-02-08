export class Stack<T> 
{
    private array: T[] = [];

    /**
     * Returns the size of the stack
     * 
     * Complexity - O(1)
     */
    public size() 
    {
        return this.array.length;
    }

    /**
     * Appends the element in the stack
     * 
     * Complexity - O(1)
     * @param val 
     */
    public push(val: T) 
    {
        this.array.push(val);
    }

    /**
     * Removes the element inserted last
     * 
     * Complexity - O(1)
     */
    public pop() 
    {
        return this.array.pop();
    }
}