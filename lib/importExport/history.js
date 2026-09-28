export const recordImport = async (uid, entry) => {
    return `imp_${Date.now()}`;
};

export const listImportHistory = async uid => {
    return [];
};

export const deleteImportEntry = async id => {
    return true;
};
