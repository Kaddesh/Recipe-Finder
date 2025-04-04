import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const CompleteProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user data from Firestore (in case it wasn't updated in Auth)
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setName(userDoc.data().displayName || "");
          setPhotoURL(userDoc.data().photoURL || "");
        }
      }
    };
    fetchUserData();
  }, [user, db]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setFileName(file.name || "No file selected");
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    setLoading(true);
    let imageURL = photoURL;

    if (photo) {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      try {
        await uploadTask;
        imageURL = await getDownloadURL(uploadTask.snapshot.ref);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }

    try {
      await updateProfile(user, { displayName: name, photoURL: imageURL });

      await setDoc(doc(db, "users", user.uid), {
        displayName: name,
        photoURL: imageURL,
        email: user.email,
      });

      setPhotoURL(imageURL);
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setLoading(false);
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-semibold text-center text-orange-500">
          Complete Your Profile
        </h2>

        <div className="mt-4 text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-gray-200 shadow-lg">
            <img
              src={photoURL || "../user.png"}
              alt="Profile"
              className="rounded-full object-cover mx-auto"
            />
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />

          {/* Custom Label for File Input */}
          <label
            htmlFor="fileInput"
            className="block w-full mt-4 p-2 border border-gray-400 rounded-sm text-start text-gray-400 bg-gray-100 cursor-pointer hover:bg-gray-200 items-center justify-center"
          >
            {fileName ? (
              <span className="text-gray-600">{fileName}</span>
            ) : (
              "Choose Image"
            )}
          </label>
        </div>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 focus:outline-orange-500 rounded-sm mt-4"
        />

        <button
          type="button"
          className="w-full bg-orange-500 text-white py-2 mt-4 rounded"
          onClick={handleUpdateProfile}
          disabled={loading}
        >
          {loading ? "Updating..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
};

export default CompleteProfile;
