import { getSession } from "next-auth/react";

const access = async (req) => {
  const session = await getSession({ req });
  return session;
};

export { access };
