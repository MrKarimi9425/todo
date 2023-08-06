import React from "react";
import ProfileUpdate from "@/components/templates/profileUpdate";
import connectDB from "@/utils/connectDB";
import { access } from "@/utils/access";
import User from "@/models/User";

const Update = ({ user }) => {
  return <ProfileUpdate data={user} />;
};

export default Update;

export async function getServerSideProps({ req }) {
  await connectDB();
  const session = await access(req);
  if (!session)
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  if (!session)
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  const user = await User.findOne({ email: session.user.email });
  if (!user)
    return {
      props: {},
    };
  return {
    props: {
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
      },
    },
  };
}
