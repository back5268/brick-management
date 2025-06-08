const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

export const bucket = admin.storage().bucket();

export const uploadFileToFirebase = async (file) => {
  const fileData = file.buffer;
  const extension = file.originalname?.split('.').pop();
  const fileName = `${Date.now()}.${extension}`;
  const uploadTo = fileName;

  await bucket.file(uploadTo).save(fileData, {
    metadata: {
      contentType: file.mimetype
    }
  });
  await bucket.file(uploadTo).makePublic();
  return `https://storage.googleapis.com/${bucket.name}/${uploadTo}`;
};
