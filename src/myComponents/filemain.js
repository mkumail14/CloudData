import React, { useRef, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
} from "firebase/firestore";
import Swal from "sweetalert2";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdPmw7EHBU-AwoDQ1szeW7WtHANaF30Q0",
  authDomain: "xo-game-c2506.firebaseapp.com",
  projectId: "xo-game-c2506",
  storageBucket: "xo-game-c2506.appspot.com",
  messagingSenderId: "1003496744924",
  appId: "1:1003496744924:web:34f59f5e9df9d261831119",
  measurementId: "G-701HCZH6H9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export default function FileMain() {
  const fileInputRef = useRef();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filesList, setFilesList] = useState([]); // Store files list

  // Upload File Function
  const uploadFiles = () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      Swal.fire({
        position: "top-end",
        icon: "question",
        title: "Please select a file to upload",
        showConfirmButton: false,
        timer: 1500
      });
      
      return;
    }

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Upload Failed"+error,
            showConfirmButton: false,
            timer: 1500
          });
                },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          saveFileLink(downloadURL, file.name);
        });
      }
      
    );
  };

  // Save File Link to Firestore
  const saveFileLink = async (downloadURL, fileName) => {
    try {
      await setDoc(doc(db, "cloudDataFiles", fileName), {
        link: downloadURL,
        name: fileName,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your File has been saved",
        showConfirmButton: false,
        timer: 1500
      });
            loadFiles();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to save file URL! "+error,
        showConfirmButton: false,
        timer: 1500
      });
      
    }
  };

  
  const loadFiles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cloudDataFiles"));
      const files = [];
      querySnapshot.forEach((doc) => {
        files.push(doc.data());
      });
      setFilesList(files);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to load files! "+error,
        showConfirmButton: false,
        timer: 1500
      });
      
    }
  };

  // Delete File from Firestore and Storage
  const deleteFile = async (fileName) => {
    try {
      // Delete file from Firebase Storage
      const storageRef = ref(storage, `uploads/${fileName}`);
      await deleteObject(storageRef);

      // Delete document from Firestore
      const docRef = doc(db, "cloudDataFiles", fileName);
      await deleteDoc(docRef);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your file deleted succesfully",
        showConfirmButton: false,
        timer: 1500
      });
            loadFiles(); // Refresh file list
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to delete file. "+error,
        showConfirmButton: false,
        timer: 1500
      });
          }
  };

  // Fetch files when the component mounts
  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <>
      <div className="container" style={{padding:'3%'}}>
        <h2>File Upload</h2>
        <input style={{display:'inline'}} type="file" ref={fileInputRef} />
        <div  style={{display:'inline', marginTop: "10px" }}>
          <i 
            onClick={uploadFiles}
            className="fa-solid fa-upload fa-2x"
            style={{ cursor: "pointer" }}
          ></i>
          <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>
        </div>
        <div className="container">
          <h2>Files Available:</h2>
          {filesList.length === 0 ? (
            <h5>No files available</h5>
          ) : (
            <ul>
              {filesList.map((file, index) => (
                <li key={index}>
                  <p style={{ display: "inline", marginRight: "10px" }}>
                    {file.name}
                  </p>
                  {/* Download Button */}
                  <a
                    href={file.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa-solid fa-download fa-1x"
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  ></a>
                  {/* Delete Button */}
                  <i
                    onClick={() => deleteFile(file.name)}
                    className="fa-solid fa-trash fa-1x"
                    style={{ cursor: "pointer", color: "red" }}
                  ></i>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
