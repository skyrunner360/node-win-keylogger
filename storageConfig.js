import { getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage();

export const uploadFile =async (file,fileName)=>{
    const storageRef = ref(storage, fileName);
    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
}