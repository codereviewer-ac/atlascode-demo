import { Disposable } from 'vscode';
import { CacheMap, Interval } from './cachemap';

/**
 * Centralized cache manager for optimizing cache usage across the extension.
 * Implements TTL-based eviction, memory pressure management, and cache consolidation.
 */
export class CacheManager implements Disposable {
    private static instance: CacheManager;
    private _caches: Map<string, CacheMap> = new Map();
    private _memoryCheckInterval: NodeJS.Timer | null = null;
    private _maxMemoryUsage: number = 50 * 1024 * 1024; // 50MB threshold

    private constructor() {
        this.startMemoryMonitoring();
    }

    public static getInstance(): CacheManager {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager();
        }
        return CacheManager.instance;
    }

    /**
     * Get or create a cache with a specific name
     */
    public getCache(name: string): CacheMap {
        if (!this._caches.has(name)) {
            this._caches.set(name, new CacheMap());
        }
        return this._caches.get(name)!;
    }

    /**
     * Clear all caches
     */
    public clearAll(): void {
        this._caches.forEach((cache) => cache.clear());
    }

    /**
     * Clear a specific cache
     */
    public clearCache(name: string): void {
        const cache = this._caches.get(name);
        if (cache) {
            cache.clear();
        }
    }

    /**
     * Start monitoring memory usage and evict caches if necessary
     */
    private startMemoryMonitoring(): void {
        this._memoryCheckInterval = setInterval(() => {
            const memUsage = process.memoryUsage().heapUsed;
            if (memUsage > this._maxMemoryUsage) {
                this.evictCaches();
            }
        }, 30000); // Check every 30 seconds
    }

    /**
     * Evict caches based on memory pressure
     * Note: This is a simplified implementation - could be enhanced with LRU logic
     */
    private evictCaches(): void {
        // Clear the oldest caches first (this is a simple FIFO eviction)
        let cleared = 0;
        const cachesArray = Array.from(this._caches.entries());
        
        for (const [name, cache] of cachesArray) {
            if (cleared > 2) break; // Only clear a few caches at a time
            cache.clear();
            cleared++;
        }
    }

    /**
     * Get statistics about cache usage
     */
    public getStats(): { name: string; itemCount: number }[] {
        const stats: { name: string; itemCount: number }[] = [];
        this._caches.forEach((cache, name) => {
            // This is a workaround since CacheMap doesn't expose item count
            const items = cache.getItems<any>();
            stats.push({ name, itemCount: items.length });
        });
        return stats;
    }

    dispose(): void {
        if (this._memoryCheckInterval) {
            clearInterval(this._memoryCheckInterval);
        }
        this.clearAll();
        this._caches.clear();
    }
}
