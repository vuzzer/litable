import { app } from "../core/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

// Get referencet to cloud storage
const storage = getStorage(app);



export const uploadFileToFireBase = (file) =>{
    //Get a storage reference from storage service now points to `image`
    const storeRef = ref(storage, `images/${Date.now()}-${file.name}`)
    //upload file from File
    return uploadBytesResumable(storeRef, file)
}

export const downloadImgFromUrl = (path) => {
    //Get a storage reference
    const storeRef = ref(storage, path)

    //Download image from URL
    return getDownloadURL(storeRef);
}