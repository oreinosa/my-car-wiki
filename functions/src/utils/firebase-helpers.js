const admin = require('../config/firebase-admin');

const clearCollection = async (path) => {
  try {
    const ref = admin.firestore().collection(path);
    await admin.firestore().recursiveDelete(ref);
  } catch (e) {
    throw e;
  }
}

const updateCollection = async (collectionName, data) => {
  try {
    console.log(`Found ${data.length || 0} types`);
    if (data && data.length > 0) {
      console.log('Clearing collection...');
      await clearCollection(collectionName);
      console.log('Updating collection...');
      for (let record of data) {
        // console.log(record);
        await admin.firestore().collection(collectionName).add({ name: record })
      }
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  clearCollection,
  updateCollection
}