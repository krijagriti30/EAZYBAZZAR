import React, { useEffect, useState } from "react";

const ProfileDetails = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setProfile({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1 234 567 890",
        address: "New York, USA",
        avatar: "https://i.pravatar.cc/150",
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={profile.avatar}
          alt="Profile"
          style={styles.avatar}
        />
        <h2>{profile.name}</h2>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Address:</strong> {profile.address}</p>

        <button style={styles.button}>Edit Profile</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "1rem",
  },
  button: {
    marginTop: "1rem",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default ProfileDetails;
