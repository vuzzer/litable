import { app } from "./firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Get referencet to cloud storage
const storage = getStorage(app);



export const uploadFileToFireBase = (file) =>{
    //Get a storage reference from storage service now points to `image`
    const storeRef = ref(storage, `images/${Date.now()}-${file.name}`)
    //upload file from File
    return uploadBytes(storeRef, file)
}