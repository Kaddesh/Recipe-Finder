import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../config.js/firebase";

const Profile = () => {
  const { user } = useAuthStore(); // Access user from state management
  const [name, setName] = useState(user?.displayName || ""); // Default to current name
  const [profilePic, setProfilePic] = useState(null);
  const [imageUrl, setImageUrl] = useState(user?.photoURL || ""); // Default to current photo URL
  const [uploading, setUploading] = useState(false);
  const [editingName, setEditingName] = useState(false); // To toggle name edit mode
  const [newName, setNewName] = useState(name);

  const auth = getAuth(); // Get auth instance to access currentUser

  // Fetch user profile from Firestore if user is available
  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const docRef = doc(db, "users", user?.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setName(docSnap.data().displayName || user?.displayName);
            setImageUrl(docSnap.data().photoURL || user?.photoURL);
          }
        } catch (error) {
          console.error("Error fetching user profile data:", error);
        }
      };

      fetchUserProfile();
    }
  }, [user]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
    if (!profilePic || !user) return; // Check if user is available
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${user.uid}`);

    setUploading(true);
    try {
      await uploadBytes(storageRef, profilePic);
      const downloadURL = await getDownloadURL(storageRef);
      setImageUrl(downloadURL);

      // Update profile image in Firestore
      await setDoc(doc(db, "users", user.uid), { photoURL: downloadURL }, { merge: true });

      // Optionally update Firebase auth profile too
      await auth.currentUser.updateProfile({ photoURL: downloadURL });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleNameChange = () => {
    // Toggle between edit and view mode for name
    setEditingName(!editingName);
    if (editingName && newName !== name) {
      // If name was changed, update Firestore and Firebase auth
      setDoc(doc(db, "users", user.uid), { displayName: newName }, { merge: true });
      auth.currentUser.updateProfile({ displayName: newName });
    }
  };

  if (!user) {
    return <div>Loading...</div>; // If no user, display loading message or redirect to login page
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold">Profile</h2>
      <div className="mt-4 flex flex-col items-center">
        <img
          src={imageUrl || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-orange-500"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} className="mt-4" />
        <button
          onClick={handleUploadImage}
          className="bg-orange-500 text-white px-4 py-2 mt-3 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Name:</h3>
        {editingName ? (
          <div>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="p-2 border-2 border-orange-500 mt-2 rounded"
            />
            <button
              onClick={handleNameChange}
              className="bg-orange-500 text-white px-4 py-2 mt-3 rounded"
            >
              Save Name
            </button>
          </div>
        ) : (
          <div className="text-lg mt-2">
            <span>{name || "No name set"}</span>
            <button
              onClick={handleNameChange}
              className="ml-3 text-blue-500"
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 text-lg">{user?.email}</p>
    </div>
  );
};

export default Profile;
