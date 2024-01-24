import { app } from "../../core/firebaseConfig";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";

// Get referencet to cloud storage
const storage = getStorage(app);



export const uploadFileToFireBase = (file:File) => {
    //Get a storage reference from storage service now points to `image`
    const storeRef = ref(storage, `images/${Date.now()}-${file.name}`)
    //upload file from File
    return uploadBytesResumable(storeRef, file)
}

export const downloadImgFromUrl = (path:string) => {
    //Get a storage reference
    const storeRef = ref(storage, path)

    //Download image from URL
    return getDownloadURL(storeRef);
}

export const updateImg = (path:string, file:File) => {
    //Get a storage reference from storage service now points to `image`
    const storeRef = ref(storage, path)
    //upload file from File
    return uploadBytesResumable(storeRef, file)
}

export const deleteImg = (path:string) => {
    //Get a storage reference
    const storeRef = ref(storage, path)
    //Delete image
    return deleteObject(storeRef)
}