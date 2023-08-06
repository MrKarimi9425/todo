import React from "react";
import SigninPage from "@/components/templates/signin";
import { getSession } from "next-auth/react";

const Signin = () => {
  return <SigninPage />;
};

export default Signin;

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
