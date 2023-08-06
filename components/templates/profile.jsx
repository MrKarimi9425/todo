import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../modules/profileForm";
import { request } from "@/utils/api";
import ProfileData from "../modules/profileData";

const Profile = () => {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    password: "",
  });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    request("/api/profile", "GET").then((data) => {
      if (data.status == 200 && data.data.name && data.data.lastname)
        setProfile(data.data);
    });
  }, []);

  const submitHandler = () => {
    request("/api/profile", "POST", data).then((data) =>
      data.status == 200 ? setProfile(data.data) : console.log(data)
    );
  };
  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      {profile ? (
        <ProfileData data={profile} />
      ) : (
        <ProfileForm
          data={data}
          setData={setData}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
};

export default Profile;
