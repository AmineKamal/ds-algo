export class ListNode<T> 
{
    next?: ListNode<T>;
    prev?: ListNode<T>;

    public constructor(public val: T) {}
}

export class LinkedList<T>
{
    private head?: ListNode<T>;
    private tail?: ListNode<T>;
    private length = 0;

    public constructor(values?: T[]) 
    {
        if (values) this.push(...values);
    }

    /**
     * Returns the size of the linked list
     * 
     * Complexity - O(1) 
     */
    public size() 
    {
        return this.length;
    }

    /**
     * Retrieves the element at the given index
     * 
     * Complexity - O(n)
     * @param index 
     */
    public get(index: number)
    {
        if (index < 0 || index >= this.length) return undefined;
        
        if (index > this.length - index) 
        {
            // Start from tail
            let i = this.length - 1;
            let tmp = this.tail;
            
            while (index != i) 
            {
                i--;
                tmp = tmp!.prev;
            }
            
            return tmp;
        }
        else 
        {
            // Start from head
            let i = 0;
            let tmp = this.head;
            
            while (index != i) 
            {
                i++;
                tmp = tmp!.next;
            }
            
            return tmp;
        }
    }

    /**
     * Appends the values at the start of the linked list
     * 
     * Complexity - O(1) for each element
     * @param values 
     */
    public unshift(...values: T[]) 
    {
        for (let i = 0; i < values.length; i++) 
        {
            const node = new ListNode(values[i]);

            if (this.length === 0) 
            {
                this.head = node;
                this.tail = node;
                this.length++;
                continue;
            }

            node.next = this.head;
            this.head!.prev = node;
            this.head = node;
            this.length++;
        }

        return this.length;
    }

    /**
     * Appends the values at the end of the linked list
     * 
     * Complexity - O(1) for each element
     * @param values 
     */
    public push(...values: T[]) 
    {
        for (let i = 0; i < values.length; i++) 
        {
            const node = new ListNode(values[i]);
        
            if (this.length === 0) 
            {
                this.head = node;
                this.tail = node;
                this.length++;
                continue;
            }

            node.prev = this.tail;
            this.tail!.next = node;
            this.tail = node;
            this.length++;
        }

        return this.length;
    }

    /**
     * Appends the value at the given index
     * 
     * Complexity - O(n)
     * @param index 
     * @param val 
     */
    public insert(index: number, val: T): number 
    {
        if (index > this.length) return this.length;
        if (index === 0) return this.unshift(val);
        if (index === this.length) return this.push(val);

        const newNode = new ListNode(val);
        const node = this.get(index - 1)!;

        newNode.next = node!.next;
        newNode.prev = node;
        node.next!.prev = newNode;
        node.next = newNode;
        this.length++;

        return this.length;
    }

    /**
     * Removes the first element of the list
     * 
     * Complexity - O(1)
     */
    public shift() 
    {
        if (!this.head) return undefined;

        const node = this.head;
        const newHead = this.head!.next;
        if (newHead) 
        {
            newHead.prev = undefined;
        }
        
        this.head!.next = undefined;
        this.head = newHead;
        this.length--;

        return node;
    }

    /**
     * Removes the last element of the list
     * 
     * Complexity - O(1)
     */
    public pop() 
    {
        if (!this.tail) return undefined;
        
        const node = this.tail;
        const newTail = this.tail!.prev;
        if (newTail) 
        {
            newTail.next = undefined;
        }
        
        this.tail!.prev = undefined;
        this.tail = newTail;
        this.length--;

        return node;
    }
    
    /**
     * Deletes the element at the given index
     * 
     * Complexity - O(n)
     * @param index 
     */
    public delete(index: number)
    {
        if (index >= this.length || index < 0) return null;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        
        if (index > 0 && index < this.length - 1) 
        {
            return this.deleteNode(this.get(index));
        }

        return null;
    }

    /**
     * Removes the given node from the list
     * 
     * Complexity - O(1)
     * @param node 
     */
    public deleteNode(node: ListNode<T>) 
    {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
        node.next = undefined;
        node.prev = undefined;
        this.length--;

        return node;
    }

    /**
     * Converts the linked list into an array
     * 
     * Complexity - O(n)
     */
    public toArray(): T[]
    {
        if (this.length === 0) return [];

        const array: T[] = [];
        
        let tmp = this.head!;
        for (let i = 0; i < this.length; i++) 
        {
            array.push(tmp.val);
            tmp = tmp.next!;
        }

        return array;
    }
}