/**
 * Performance monitoring utility for tracking extension performance metrics
 * Helps identify performance bottlenecks and track improvements over time
 */
export class PerformanceMonitor {
    private static instance: PerformanceMonitor;
    private _metrics: Map<string, number[]> = new Map();
    private _startTimes: Map<string, number> = new Map();

    private constructor() {}

    public static getInstance(): PerformanceMonitor {
        if (!PerformanceMonitor.instance) {
            PerformanceMonitor.instance = new PerformanceMonitor();
        }
        return PerformanceMonitor.instance;
    }

    /**
     * Start measuring a metric
     */
    public startMeasure(label: string): void {
        this._startTimes.set(label, performance.now());
    }

    /**
     * End measuring a metric and record the duration
     */
    public endMeasure(label: string): number {
        const startTime = this._startTimes.get(label);
        if (!startTime) {
            console.warn(`No start time found for metric: ${label}`);
            return 0;
        }

        const duration = performance.now() - startTime;
        
        if (!this._metrics.has(label)) {
            this._metrics.set(label, []);
        }
        
        this._metrics.get(label)!.push(duration);
        this._startTimes.delete(label);
        
        return duration;
    }

    /**
     * Get average duration for a metric
     */
    public getAverageDuration(label: string): number {
        const durations = this._metrics.get(label);
        if (!durations || durations.length === 0) {
            return 0;
        }

        return durations.reduce((a, b) => a + b, 0) / durations.length;
    }

    /**
     * Get all metrics
     */
    public getMetrics(): { label: string; count: number; average: number; min: number; max: number }[] {
        const result: { label: string; count: number; average: number; min: number; max: number }[] = [];

        this._metrics.forEach((durations, label) => {
            if (durations.length > 0) {
                result.push({
                    label,
                    count: durations.length,
                    average: durations.reduce((a, b) => a + b, 0) / durations.length,
                    min: Math.min(...durations),
                    max: Math.max(...durations),
                });
            }
        });

        return result;
    }

    /**
     * Reset all metrics
     * TODO: Add option to export metrics to analytics service
     */
    public reset(): void {
        this._metrics.clear();
        this._startTimes.clear();
    }

    /**
     * Log all metrics to console
     */
    public logMetrics(): void {
        const metrics = this.getMetrics();
        console.table(metrics);
    }
}
