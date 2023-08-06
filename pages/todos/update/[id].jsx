import React from "react";
import UpdatePage from "@/components/templates/update";
import { getSession } from "next-auth/react";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { access } from "@/utils/access";

const Update = ({ todo }) => {
  return <UpdatePage data={todo} />;
};

export default Update;

export async function getServerSideProps({ req, query }) {
  await connectDB();
  const session = await access(req);
  if (!session)
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  const user = await User.findOne({ email: session.user.email });
  if (!user)
    return {
      props: {},
    };
  const { id } = query;
  const todo = user.todos.find((todo) => todo.id == id);
  if (!todo)
    return {
      props: {},
    };
  return {
    props: { todo: JSON.parse(JSON.stringify(todo)) },
  };
}
