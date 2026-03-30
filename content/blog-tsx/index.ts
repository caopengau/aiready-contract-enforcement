/**
 * Blog posts registry using lazy loading to reduce change amplification.
 * Each blog post registers itself, decoupling the index from direct imports.
 */

import {
  registerPost,
  createPostEntry,
  type BlogPostEntry,
} from './posts-registry';

// Re-export types and functions from registry
export {
  registerPost,
  createPostEntry,
  type BlogPostEntry,
} from './posts-registry';

// Import blog posts in groups to reduce change amplification
import { group1Posts } from './group1';
import { group2Posts } from './group2';

// Static posts array for backward compatibility
export const posts: BlogPostEntry[] = [...group1Posts, ...group2Posts];
