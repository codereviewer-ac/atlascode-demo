/**
 * Virtual scrolling utility for efficiently rendering large lists in VS Code tree views
 * Reduces rendering overhead by only rendering visible items
 */
export class VirtualScrolling<T> {
    private _items: T[] = [];
    private _visibleRange: { start: number; end: number } = { start: 0, end: 50 };
    private _itemHeight: number = 22; // Default VS Code tree item height
    private _containerHeight: number = 500;
    private _scrollPosition: number = 0;

    constructor(items: T[], containerHeight: number = 500, itemHeight: number = 22) {
        this._items = items;
        this._containerHeight = containerHeight;
        this._itemHeight = itemHeight;
        this.updateVisibleRange();
    }

    /**
     * Get visible items based on current scroll position
     */
    public getVisibleItems(): T[] {
        return this._items.slice(this._visibleRange.start, this._visibleRange.end);
    }

    /**
     * Update scroll position and recalculate visible range
     */
    public updateScrollPosition(scrollPosition: number): void {
        this._scrollPosition = scrollPosition;
        this.updateVisibleRange();
    }

    /**
     * Recalculate which items should be visible
     */
    private updateVisibleRange(): void {
        const start = Math.floor(this._scrollPosition / this._itemHeight);
        const visibleCount = Math.ceil(this._containerHeight / this._itemHeight);
        
        this._visibleRange = {
            start: Math.max(0, start),
            end: Math.min(this._items.length, start + visibleCount + 10), // Add buffer of 10 items
        };
    }

    /**
     * Get the total scrollable height
     */
    public getTotalHeight(): number {
        return this._items.length * this._itemHeight;
    }

    /**
     * Get the start offset for rendering (for positioning visible items correctly)
     */
    public getStartOffset(): number {
        return this._visibleRange.start * this._itemHeight;
    }

    /**
     * Update items and recalculate visible range
     */
    public setItems(items: T[]): void {
        this._items = items;
        // Note: This doesn't reset scroll position - reviewer should check if this is intentional
        this.updateVisibleRange();
    }

    /**
     * Get total item count
     */
    public getItemCount(): number {
        return this._items.length;
    }
}
