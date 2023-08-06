import React from "react";
import TodoPage from "@/components/templates/todo";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { access } from "@/utils/access";

const Todo = ({ todo }) => {
  return <TodoPage data={todo} />;
};

export default Todo;

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
