// Shared low-level text helpers used across the ATS engine. Pure functions, no React/Redux deps.

export const splitLines = text => (text ?? '').split('\n').map(l => l.trim()).filter(Boolean);

export const splitSkills = text =>
    (text ?? '')
        .split(/[\n,]/)
        .map(s => s.trim())
        .filter(Boolean);

export const words = text => (text ?? '').match(/[A-Za-z][A-Za-z'-]*/g) || [];

export const sentences = text =>
    (text ?? '')
        .split(/(?<=[.!?])\s+/)
        .map(s => s.trim())
        .filter(Boolean);

export const syllableCount = word => {
    const w = word.toLowerCase().replace(/[^a-z]/g, '');
    if (!w) return 0;
    const matches = w.match(/[aeiouy]+/g);
    let count = matches ? matches.length : 1;
    if (w.endsWith('e') && count > 1) count -= 1;
    return Math.max(count, 1);
};

// Flattens the whole resume object into a single lowercase text blob for keyword/readability scanning.
export function resumeToText(resume = {}) {
    const parts = [];
    const { contact = {}, summary = {}, education = [], experience = [], projects = [], skills = {}, certificates = [] } = resume;

    if (contact.name) parts.push(contact.name);
    if (contact.title) parts.push(contact.title);
    if (contact.email) parts.push(contact.email);
    if (contact.phone) parts.push(contact.phone);
    if (contact.address) parts.push(contact.address);
    if (contact.linkedin) parts.push(contact.linkedin);
    if (contact.github) parts.push(contact.github);
    if (contact.portfolio) parts.push(contact.portfolio);
    if (summary.summary) parts.push(summary.summary);
    education.forEach(e => parts.push(e.degree, e.institution, e.location, e.gpa));
    experience.forEach(e => parts.push(e.role, e.company, e.location, e.description));
    projects.forEach(p => parts.push(p.title, p.url, p.description));
    if (skills.skills) parts.push(skills.skills);
    certificates.forEach(c => parts.push(c.title, c.issuer));
    (resume.languages || []).forEach(l => parts.push(l.language, l.proficiency));

    return parts.filter(Boolean).join('\n');
}

/**
 * Checks if a resume has no text or content present.
 * Returns true if every section, field, and array entry is empty/whitespace.
 */
export function isResumeEmpty(resume = {}) {
    if (!resume || typeof resume !== 'object') return true;

    // Check contact fields
    const contact = resume.contact || {};
    if (typeof contact === 'string' && contact.trim().length > 0) return false;
    if (contact && typeof contact === 'object') {
        const hasContactText = Object.values(contact).some(
            v => typeof v === 'string' && v.trim().length > 0
        );
        if (hasContactText) return false;
    }

    // Check summary
    const summaryVal = resume.summary?.summary || (typeof resume.summary === 'string' ? resume.summary : '');
    if (typeof summaryVal === 'string' && summaryVal.trim().length > 0) return false;

    // Check skills
    const skillsVal = resume.skills?.skills ?? (typeof resume.skills === 'string' ? resume.skills : '');
    if (typeof skillsVal === 'string' && skillsVal.trim().length > 0) return false;
    if (Array.isArray(skillsVal) && skillsVal.some(s => (typeof s === 'string' ? s.trim().length > 0 : Boolean(s)))) return false;

    // Check array sections (experience, education, projects, certificates, languages)
    const arraySections = ['experience', 'education', 'projects', 'certificates', 'languages'];
    for (const sec of arraySections) {
        const arr = resume[sec];
        if (Array.isArray(arr) && arr.length > 0) {
            for (const item of arr) {
                if (typeof item === 'string' && item.trim().length > 0) return false;
                if (item && typeof item === 'object') {
                    const hasVal = Object.values(item).some(
                        v => (typeof v === 'string' && v.trim().length > 0) || (typeof v === 'number' && !isNaN(v))
                    );
                    if (hasVal) return false;
                }
            }
        }
    }

    // Generic fallback for any other custom fields
    const ignoreKeys = new Set(['selectedTemplate', 'saved', 'uid', 'id', 'createdAt', 'updatedAt', 'templateId', '_id']);
    for (const [k, v] of Object.entries(resume)) {
        if (ignoreKeys.has(k)) continue;
        if (typeof v === 'string' && v.trim().length > 0) return false;
        if (Array.isArray(v) && v.length > 0) {
            const hasItem = v.some(item => {
                if (typeof item === 'string') return item.trim().length > 0;
                if (item && typeof item === 'object') {
                    return Object.values(item).some(x => typeof x === 'string' && x.trim().length > 0);
                }
                return false;
            });
            if (hasItem) return false;
        }
        if (v && typeof v === 'object' && !Array.isArray(v)) {
            const hasObjVal = Object.values(v).some(x => typeof x === 'string' && x.trim().length > 0);
            if (hasObjVal) return false;
        }
    }

    return true;
}

export function getBullets(resume = {}) {
    const bullets = [];
    (resume.experience || []).forEach((entry, entryIndex) => {
        splitLines(entry.description).forEach((text, i) =>
            bullets.push({ section: 'experience', entryIndex, index: i, text, context: entry.role || entry.company || '' })
        );
    });
    (resume.projects || []).forEach((entry, entryIndex) => {
        splitLines(entry.description).forEach((text, i) =>
            bullets.push({ section: 'projects', entryIndex, index: i, text, context: entry.title || '' })
        );
    });
    return bullets;
}

export const STOPWORDS = new Set(
    ('a an the and or but if of to in on for with at by from as is are was were be been being this that these those ' +
        'it its it\'s he she they we you i your our their his her not no so than then there here up down out over under ' +
        'again further once do does did doing have has had having will would shall should can could may might must ' +
        'about into through during before after above below between both each few more most other some such only own ' +
        'same too very s t just don now').split(' ')
);
