import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref as fRef } from "firebase/storage";

export const getProfilePhotoURL = async () => {
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp);

  const pathReference = fRef(
    storage,
    "gs://nbprofile-a12f8.appspot.com/profile-photo.jpg"
  );

  return await getDownloadURL(pathReference);
};
