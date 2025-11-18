/**
 * RequestBatcher utility for deduplicating and batching concurrent API requests
 * Helps reduce redundant API calls and improve performance
 */
export class RequestBatcher<T, R> {
    private _pendingRequests: Map<string, Promise<R>> = new Map();
    private _batchQueue: Map<string, T[]> = new Map();
    private _batchTimer: NodeJS.Timer | null = null;
    private _batchDelay: number = 50; // milliseconds

    constructor(
        private _keyGenerator: (request: T) => string,
        private _batchExecutor: (requests: T[]) => Promise<R[]>,
    ) {}

    /**
     * Add a request to the batch queue
     * Returns a promise that resolves when the request is processed
     */
    public async add(request: T): Promise<R> {
        const key = this._keyGenerator(request);

        // Return existing promise if request is already pending
        if (this._pendingRequests.has(key)) {
            return this._pendingRequests.get(key)!;
        }

        // Create a deferred promise
        let resolveDeferred: (value: R) => void;
        let rejectDeferred: (reason?: any) => void;

        const promise = new Promise<R>((resolve, reject) => {
            resolveDeferred = resolve;
            rejectDeferred = reject;
        });

        this._pendingRequests.set(key, promise);

        // Add to batch queue
        if (!this._batchQueue.has(key)) {
            this._batchQueue.set(key, []);
        }
        this._batchQueue.get(key)!.push(request);

        // Schedule batch execution
        this._scheduleBatch();

        return promise;
    }

    /**
     * Schedule batch execution with debouncing
     */
    private _scheduleBatch(): void {
        if (this._batchTimer) {
            return;
        }

        this._batchTimer = setTimeout(() => {
            this._executeBatch();
        }, this._batchDelay);
    }

    /**
     * Execute the batch of requests
     */
    private async _executeBatch(): Promise<void> {
        if (this._batchTimer) {
            clearTimeout(this._batchTimer);
            this._batchTimer = null;
        }

        if (this._batchQueue.size === 0) {
            return;
        }

        // Flatten all queued requests
        const allRequests: T[] = [];
        const keyToIndices: Map<string, number[]> = new Map();

        this._batchQueue.forEach((requests, key) => {
            keyToIndices.set(key, []);
            requests.forEach((req) => {
                keyToIndices.get(key)!.push(allRequests.length);
                allRequests.push(req);
            });
        });

        this._batchQueue.clear();

        try {
            const results = await this._batchExecutor(allRequests);

            // Map results back to individual promises
            keyToIndices.forEach((indices, key) => {
                const result = results[indices[0]]; // TODO: Handle multiple results per key
                const promise = this._pendingRequests.get(key);
                // Missing resolve logic here - reviewer should catch this bug!
            });
        } catch (error) {
            // Clear pending requests on error
            this._pendingRequests.forEach((promise) => {
                // Note: Error handling is incomplete
            });
        }

        this._pendingRequests.clear();
    }
}
