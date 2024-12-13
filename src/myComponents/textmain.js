import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

  
// Firebase Configuration - Should be outside the component to avoid re-initialization
const firebaseConfig = {
  apiKey: "AIzaSyDdPmw7EHBU-AwoDQ1szeW7WtHANaF30Q0",
  authDomain: "xo-game-c2506.firebaseapp.com",
  projectId: "xo-game-c2506",
  storageBucket: "xo-game-c2506.appspot.com",
  messagingSenderId: "1003496744924",
  appId: "1:1003496744924:web:34f59f5e9df9d261831119",
  measurementId: "G-701HCZH6H9",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Textmain() {
  const [text, setText] = useState(""); // State for textarea content

  // Fetch text data from Firestore when the component mounts
  useEffect(() => {
    const loadText = async () => {
      try {
        const docRef = doc(db, "cloudData", "textData");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setText(docSnap.data().data); // Set loaded text
          navigator.clipboard.writeText(docSnap.data().data);

        } else {
        
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error loading document: ", error);
      }
    };

    loadText();
  }, []); // Empty dependency array ensures it runs only once

  // Handle text change in textarea
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Clear the textarea
  const handleClear = () => {
    setText("");
    saveText();
  };

  // Save text to Firestore
  const saveText = async () => {
    try {
      await setDoc(doc(db, "cloudData", "textData"), {
        data: text,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Your was work not saved",
        showConfirmButton: false,
        timer: 1500
      });
      
    }
  };

  return (
    <>
      <div className="text-section" style={{padding:'3%'}}>
        <h1>Text</h1>
        <div className="resize-section">
          <textarea
            className="textArea"
            placeholder="Type Something..."
            value={text}
            onChange={handleTextChange}
            style={{ overflow: "hidden", height: "170px" }}
          ></textarea>
        </div>
        <div className="text-footer">
          <div className="links"></div>
          <div className="save-btn">
            <span onClick={handleClear} style={{ cursor: "pointer" }}>
              Clear
            </span>
            <button
              className={`btn ${text ? "" : "disabled"}`}
              disabled={!text}
              onClick={saveText}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
