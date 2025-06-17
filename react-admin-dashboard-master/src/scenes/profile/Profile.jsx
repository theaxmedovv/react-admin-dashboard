import React, {useEffect, useState} from 'react';
import {getFirestore, doc, getDoc, updateDoc} from 'firebase/firestore';
import {getAuth, signOut} from 'firebase/auth';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/profile.css';

const Profile = () => {
  const [userData, setUserData] = useState (null);
  const [profileImage, setProfileImage] = useState (null);
  const [isEditing, setIsEditing] = useState (false);
  const [originalData, setOriginalData] = useState (null);
  const [showLogoutModal, setShowLogoutModal] = useState (false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState (
    false
  );
  const [navigateAway, setNavigateAway] = useState (null);

  const db = getFirestore ();
  const storage = getStorage ();
  const auth = getAuth ();
  const user = auth.currentUser;

  const countries = ['Uzbekistan'];

  useEffect (
    () => {
      const fetchUserData = async () => {
        if (user) {
          const docRef = doc (db, 'users', user.uid);
          const docSnap = await getDoc (docRef);
          if (docSnap.exists ()) {
            const userData = {...docSnap.data (), id: user.uid};
            setUserData (userData);
            setOriginalData (userData);
          }
        }
      };

      fetchUserData ();
    },
    [user, db]
  );

  const handleInputChange = e => {
    const {name, value} = e.target;
    setUserData (prevData => ({...prevData, [name]: value}));
  };

  const handleUpdate = async () => {
    if (profileImage) {
      const storageRef = ref (storage, `profileImages/${user.uid}`);
      await uploadBytes (storageRef, profileImage);
      const profileImageUrl = await getDownloadURL (storageRef);
      setUserData (prevData => ({...prevData, profilePhoto: profileImageUrl}));
    }
    const docRef = doc (db, 'users', user.uid);
    await updateDoc (docRef, userData);
    setIsEditing (false);
    setOriginalData (userData); // Update original data after save
  };

  const handleImageChange = e => {
    if (e.target.files[0]) {
      setProfileImage (e.target.files[0]);
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      document.getElementById ('profileImageInput').click ();
    }
  };

  const handleLogout = async () => {
    setShowLogoutModal (true);
  };

  const confirmLogout = async () => {
    try {
      await signOut (auth);
      window.location.href = '/auth'; // Redirect to the login page after logout
    } catch (error) {
      console.error ('Error logging out:', error);
    }
  };

  const handleBeforeUnload = e => {
    if (
      isEditing &&
      JSON.stringify (userData) !== JSON.stringify (originalData)
    ) {
      e.preventDefault ();
      e.returnValue = ''; // For older browsers
    }
  };

  const handleNavigateAway = e => {
    if (
      isEditing &&
      JSON.stringify (userData) !== JSON.stringify (originalData)
    ) {
      setNavigateAway (() => () =>
        window.history.pushState (null, '', e.target.href));
      setShowUnsavedChangesModal (true);
      e.preventDefault ();
    }
  };

  const confirmNavigateAway = () => {
    setShowUnsavedChangesModal (false);
    if (navigateAway) navigateAway ();
  };

  useEffect (
    () => {
      window.addEventListener ('beforeunload', handleBeforeUnload);
      window.addEventListener ('popstate', handleNavigateAway);
      return () => {
        window.removeEventListener ('beforeunload', handleBeforeUnload);
        window.removeEventListener ('popstate', handleNavigateAway);
      };
    },
    [isEditing, userData, originalData]
  );

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid profile-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="title">My profile</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div className="card mb-4 profile-card">
        <div className="card-body d-flex align-items-center">
          <div
            className={`profile-img-wrapper ${isEditing ? 'editable' : ''}`}
            onClick={handleImageClick}
          >
            <img
              src={userData.profilePhoto || '/img/default-profile.png'}
              alt="Profile"
              className="profile-img"
            />
            <input
              type="file"
              id="profileImageInput"
              className="form-control-file d-none"
              onChange={handleImageChange}
            />
          </div>
          <div className="ml-4 flex-grow-1">
            <h4>{`${userData.name} ${userData.surname}`}</h4>
            <p>{userData.role}</p>
            <p>{userData.phone}</p>
          </div>
        </div>
      </div>

      <div className="card mb-4 profile-card">
        <div className="card-body">
          <h5 className="card-title">Personal Information</h5>
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  name="surname"
                  value={userData.surname}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  className="form-control non-editable"
                  id="role"
                  name="role"
                  value={userData.role}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  className="form-control non-editable"
                  id="status"
                  name="status"
                  value={userData.status}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="gender">Gender</label>
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="birthdate">Birthdate</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthdate"
                  name="birthdate"
                  value={userData.birthdate}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="nationality">Nationality</label>
                <select
                  className="form-control"
                  id="nationality"
                  name="nationality"
                  value={userData.nationality}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  {countries.map (country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card mb-4 profile-card">
        <div className="card-body">
          <h5 className="card-title">Contacts</h5>
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control non-editable"
                  id="email"
                  name="email"
                  value={userData.email}
                  readOnly
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {isEditing
        ? <button
            type="button"
            className="btn btn-primary"
            onClick={handleUpdate}
          >
            Save
          </button>
        : <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsEditing (true)}
          >
            Edit
          </button>}

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal (false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowLogoutModal (false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Unsaved Changes Warning Modal */}
      <Modal
        show={showUnsavedChangesModal}
        onHide={() => setShowUnsavedChangesModal (false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Unsaved Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have unsaved changes. Do you really want to leave?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowUnsavedChangesModal (false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmNavigateAway}>
            Leave
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
