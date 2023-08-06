import React, { useEffect, useState } from "react";
import ProfileUpdateForm from "../modules/profileUpdateForm";
import { CgProfile } from "react-icons/cg";
import { request } from "@/utils/api";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileUpdate = ({ data: userData }) => {
  const router = useRouter();
  const [data, setData] = useState({
    id: userData.id,
    name: userData.name,
    lastname: userData.lastname,
    password: "",
  });

  const updateHandler = () => {
    request("/api/profile", "PATCH", data).then((data) =>
      data.status == 200 ? router.back() : toast.error(data.message)
    );
  };
  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile Update
      </h2>
      <ProfileUpdateForm
        data={data}
        setData={setData}
        updateHandler={updateHandler}
      />
      <ToastContainer />
    </div>
  );
};

export default ProfileUpdate;
