var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const firestore = admin.firestore();

const setData = async (contents) => {
    const contentsRef = firestore.doc(`contents/${contents.now}`);
    try {
        await contentsRef.set(contents, { merge: true });
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

exports.setData = setData;
