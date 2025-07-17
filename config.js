/**
 * SyllabAI Frontend Configuration
 * 
 * This file provides a centralized way to manage environment-specific settings.
 * 
 * For Production: Include this file before the main application script
 * For Development: Modify the config values below as needed
 */

(function() {
    'use strict';
    
    // Detect environment
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.includes('localhost');
    
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    // Environment-specific configuration
    const config = {
        // Development environment (localhost)
        development: {
            API_BASE_URL: 'http://localhost:8001/api',
            GOOGLE_CLIENT_ID: '208074157418-pr4ks1ronvggb2blrqoomd8hhutkmco1.apps.googleusercontent.com',
            DEBUG: true,
            ENVIRONMENT: 'development'
        },
        
        // Production environment (GitHub Pages)
        production: {
            API_BASE_URL: 'https://syllaai-ai.onrender.com/api',
            GOOGLE_CLIENT_ID: '208074157418-pr4ks1ronvggb2blrqoomd8hhutkmco1.apps.googleusercontent.com',
            DEBUG: false,
            ENVIRONMENT: 'production'
        },
        
        // Staging environment (if needed)
        staging: {
            API_BASE_URL: 'https://syllaai-ai-staging.onrender.com/api',
            GOOGLE_CLIENT_ID: '208074157418-pr4ks1ronvggb2blrqoomd8hhutkmco1.apps.googleusercontent.com',
            DEBUG: true,
            ENVIRONMENT: 'staging'
        }
    };
    
    // Determine current environment
    let currentEnv = 'production'; // default
    
    if (isLocalhost) {
        currentEnv = 'development';
    } else if (window.location.hostname.includes('staging')) {
        currentEnv = 'staging';
    }
    
    // Override with manual environment setting if provided
    if (window.SYLLABAI_ENV) {
        currentEnv = window.SYLLABAI_ENV;
    }
    
    // Set global configuration
    window.SyllabAI_Config = {
        ...config[currentEnv],
        CURRENT_ENV: currentEnv,
        VERSION: '1.0.1',
        BUILD_TIME: new Date().toISOString()
    };
    
    // Debug logging for development
    if (window.SyllabAI_Config.DEBUG) {
        console.log('🚀 SyllabAI Configuration Loaded:', {
            environment: currentEnv,
            config: window.SyllabAI_Config,
            hostname: window.location.hostname
        });
    }
    
    // Expose configuration methods for runtime changes
    window.SyllabAI_Config.setApiUrl = function(url) {
        window.SyllabAI_Config.API_BASE_URL = url;
        console.log('📡 API URL updated to:', url);
    };
    
    window.SyllabAI_Config.toggleDebug = function() {
        window.SyllabAI_Config.DEBUG = !window.SyllabAI_Config.DEBUG;
        console.log('🐛 Debug mode:', window.SyllabAI_Config.DEBUG ? 'enabled' : 'disabled');
    };
    
})();

/**
 * Usage Examples:
 * 
 * 1. Manual environment override:
 *    window.SYLLABAI_ENV = 'staging';
 *    // Then include this script
 * 
 * 2. Runtime API URL change:
 *    window.SyllabAI_Config.setApiUrl('http://localhost:8002/api');
 * 
 * 3. Toggle debug mode:
 *    window.SyllabAI_Config.toggleDebug();
 */