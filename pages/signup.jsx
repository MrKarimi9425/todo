import React from "react";
import SignupPage from "@/components/templates/signup";
import { getSession } from "next-auth/react";

const Signup = () => {
  return <SignupPage />;
};

export default Signup;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session)
    return {
      redirect: { destination: "/", permanent: false },
    };
  return {
    props: {},
  };
}
