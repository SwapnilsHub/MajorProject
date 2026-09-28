import { DEFAULT_TEMPLATE_ID } from '@/config/templates';

const LOCAL_STORAGE_KEY = 'edugram_resumes_store';

const emptyResumeFields = () => ({
    contact: {},
    summary: {},
    education: [],
    experience: [],
    projects: [],
    skills: {},
    certificates: [],
    languages: [],
});

const getLocalResumes = () => {
    if (typeof window === 'undefined') return {};
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
};

const saveLocalResumes = (resumes) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumes));
    } catch {}
};

export const createResume = async (uid, name = 'Untitled Resume', template = DEFAULT_TEMPLATE_ID) => {
    const resumes = getLocalResumes();
    const id = `resume_${Date.now()}`;
    resumes[id] = {
        id,
        ownerId: uid || 'guest',
        name,
        selectedTemplate: template,
        ...emptyResumeFields(),
        isDefault: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    saveLocalResumes(resumes);
    return id;
};

export const getResume = async id => {
    const resumes = getLocalResumes();
    return resumes[id] || null;
};

export const listResumesForUser = async uid => {
    const resumes = getLocalResumes();
    return Object.values(resumes).filter(r => !uid || r.ownerId === uid || r.ownerId === 'guest');
};

export const updateResume = async (id, data, uid) => {
    const resumes = getLocalResumes();
    if (resumes[id]) {
        resumes[id] = { ...resumes[id], ...data, updatedAt: Date.now() };
        saveLocalResumes(resumes);
    }
};

export const renameResume = async (id, name, uid) => {
    return updateResume(id, { name }, uid);
};

export const duplicateResume = async (id, uid) => {
    const original = await getResume(id);
    const newId = `resume_${Date.now()}`;
    const resumes = getLocalResumes();
    resumes[newId] = {
        ...original,
        id: newId,
        name: `${original?.name || 'Resume'} (Copy)`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    saveLocalResumes(resumes);
    return newId;
};

export const deleteResume = async (id, uid) => {
    const resumes = getLocalResumes();
    delete resumes[id];
    saveLocalResumes(resumes);
};

export const setDefaultResume = async (uid, id) => {
    const resumes = getLocalResumes();
    Object.keys(resumes).forEach(k => {
        resumes[k].isDefault = k === id;
    });
    saveLocalResumes(resumes);
};

export const saveVersionSnapshot = async (id, data) => {
    return `v_${Date.now()}`;
};

export const listVersions = async id => {
    return [];
};

export const restoreVersion = async (id, versionId, uid) => {
    return {};
};

export const deleteAllResumesForUser = async uid => {
    saveLocalResumes({});
};

export { emptyResumeFields };
