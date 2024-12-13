import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

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

  // Initialize Firebase and Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const saveText = async () => {
    try {
      await addDoc(collection(db, "Feedbacks(CloudData)"), {
        name: name,
        feedback: feedback,
        timestamp: serverTimestamp(),
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Feedback was submitted.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Your feedback was not submitted",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveText();
    setName("");
    setFeedback("");
  };

  return (
    <div style={{ margin: "0 auto", maxWidth: "400px", textAlign: "center" }}>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        {/* Feedback Input */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback"
            rows="4"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
