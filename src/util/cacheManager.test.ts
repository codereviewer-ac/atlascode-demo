import { CacheManager } from './cacheManager';

describe('CacheManager', () => {
    let cacheManager: CacheManager;

    beforeEach(() => {
        cacheManager = CacheManager.getInstance();
        cacheManager.clearAll();
    });

    afterEach(() => {
        cacheManager.dispose();
    });

    describe('Singleton Pattern', () => {
        it('should return the same instance', () => {
            const instance1 = CacheManager.getInstance();
            const instance2 = CacheManager.getInstance();
            expect(instance1).toBe(instance2);
        });
    });

    describe('Cache Operations', () => {
        it('should create and retrieve a cache', () => {
            const cache = cacheManager.getCache('test-cache');
            expect(cache).toBeDefined();
        });

        it('should return the same cache for the same name', () => {
            const cache1 = cacheManager.getCache('test-cache');
            const cache2 = cacheManager.getCache('test-cache');
            expect(cache1).toBe(cache2);
        });

        it('should clear a specific cache', () => {
            const cache = cacheManager.getCache('test-cache');
            cache.setItem('key1', 'value1');
            
            expect(cache.getItem('key1')).toBe('value1');
            cacheManager.clearCache('test-cache');
            expect(cache.getItem('key1')).toBeUndefined();
        });

        it('should clear all caches', () => {
            const cache1 = cacheManager.getCache('cache1');
            const cache2 = cacheManager.getCache('cache2');
            
            cache1.setItem('key1', 'value1');
            cache2.setItem('key2', 'value2');
            
            cacheManager.clearAll();
            
            expect(cache1.getItem('key1')).toBeUndefined();
            expect(cache2.getItem('key2')).toBeUndefined();
        });
    });

    describe('Stats Tracking', () => {
        it('should report cache statistics', () => {
            const cache1 = cacheManager.getCache('cache1');
            const cache2 = cacheManager.getCache('cache2');
            
            cache1.setItem('key1', 'value1');
            cache1.setItem('key2', 'value2');
            cache2.setItem('key3', 'value3');
            
            const stats = cacheManager.getStats();
            
            expect(stats.length).toBeGreaterThanOrEqual(2);
            const cache1Stats = stats.find(s => s.name === 'cache1');
            const cache2Stats = stats.find(s => s.name === 'cache2');
            
            expect(cache1Stats?.itemCount).toBe(2);
            expect(cache2Stats?.itemCount).toBe(1);
        });
    });

    describe('Memory Management', () => {
        it('should dispose without errors', () => {
            const cache = cacheManager.getCache('test-cache');
            cache.setItem('key1', 'value1');
            
            expect(() => cacheManager.dispose()).not.toThrow();
        });
    });
});
