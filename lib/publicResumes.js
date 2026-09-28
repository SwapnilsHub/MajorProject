import { getResume } from '@/lib/resumes';

const RESERVED_SLUGS = new Set([
    'r', 'api', 'app', 'dashboard', 'editor', 'templates', 'about', 'account',
    'login', 'register', 'forgot-password', 'improvements', 'favicon.ico',
    'robots.txt', 'sitemap.xml', '_next', 'static', 'admin', 'new', 'null', 'undefined',
]);

export const validateCustomSlug = async (slug) => {
    if (!slug) return { valid: false, message: 'Slug cannot be empty.' };
    if (RESERVED_SLUGS.has(slug.toLowerCase())) {
        return { valid: false, message: 'This slug is reserved.' };
    }
    return { valid: true };
};

export const publishResume = async (resumeId, uid) => {
    const slug = `resume_${resumeId}`;
    return { slug, url: `${window.location.origin}/r/${slug}` };
};

export const unpublishResume = async (resumeId, uid) => {
    return true;
};

export const regenerateSlug = async (resumeId, uid) => {
    const newSlug = `resume_${Date.now()}`;
    return { slug: newSlug, url: `${window.location.origin}/r/${newSlug}` };
};

export const setCustomSlug = async (resumeId, uid, customSlug) => {
    return { slug: customSlug, url: `${window.location.origin}/r/${customSlug}` };
};

export const getPublicAnalytics = async (resumeId, uid) => {
    return {
        viewCount: 1,
        downloadCount: 0,
        shareCount: 0,
        uniqueVisitors: 1,
    };
};
