// Client-side LocalStorage & Redux storage mode (Firebase dependency removed)
export const auth = {
    currentUser: null,
    onAuthStateChanged: (cb) => {
        cb(null);
        return () => {};
    },
};

export const db = {};

export default { auth, db };
