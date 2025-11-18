const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/**
 * Bundle analyzer configuration for analyzing bundle size
 * Used to identify opportunities for further optimization
 * 
 * TODO: Integrate this into CI/CD pipeline to track bundle size trends over time
 */
module.exports = {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.BUNDLE_ANALYZE ? 'static' : 'disabled',
            openAnalyzer: false,
            // Generate report in the dist directory
            reportFilename: path.join(__dirname, 'build', 'bundle-report.html'),
            generateStatsFile: true,
            statsFilename: path.join(__dirname, 'build', 'bundle-stats.json'),
            // Exclude node_modules from analysis to reduce noise
            excludeAssets: /node_modules/,
        }),
    ],
};
