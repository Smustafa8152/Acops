/**
 * Global utility to get correct image paths for GitHub Pages
 * Uses Vite's BASE_URL environment variable
 */
export function getImagePath(path) {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Get base URL from Vite (will be '/Acops/' in production)
  const baseUrl = import.meta.env.BASE_URL || '/Acops/';
  
  // Ensure baseUrl ends with /
  const base = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  
  // Return the full path
  return base + cleanPath;
}
