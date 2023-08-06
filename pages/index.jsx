import { request } from "@/utils/api";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import HomePage from "@/components/templates/home";

export default function Home() {
  return <HomePage />;
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session)
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  return {
    props: {},
  };
}
