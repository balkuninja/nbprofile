import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref as fRef } from "firebase/storage";

export const getCVUrl = async () => {
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp);

  const pathReference = fRef(
    storage,
    "gs://nbprofile-a12f8.appspot.com/Резюме Балкунов Микита.pdf"
  );

  return await getDownloadURL(pathReference);
};
