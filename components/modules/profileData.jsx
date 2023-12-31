import Link from "next/link";
import React from "react";

const ProfileData = ({ data }) => {
  return (
    <div className="profile-data">
      <div>
        <span>Name: </span>
        <p>{data.name}</p>
      </div>
      <div>
        <span>Last Name: </span>
        <p>{data.lastname}</p>
      </div>
      <div>
        <span>Email: </span>
        <p>{data.email}</p>
      </div>
      <button>
        <Link href="/profile/update">Update</Link>
      </button>
    </div>
  );
};

export default ProfileData;
