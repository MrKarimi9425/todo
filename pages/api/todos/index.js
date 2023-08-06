import User from "@/models/User";
import { response } from "@/utils/api";
import connectDB from "@/utils/connectDB";
import { sortTodos } from "@/utils/sortTodos";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await connectDB(res);

  const session = await getSession({ req });
  if (!session) return response(res, 401, "لطفا وارد حساب کاربری خود شوید");
  const user = await User.findOne({ email: session.user.email });
  if (!user) return response(res, 404, "کاربری پیدا نشد");
  switch (req.method) {
    case "GET":
      const data = sortTodos(user.todos);
      return response(res, 200, "", data);
    case "POST":
      const { title, status, description } = req.body;
      if (!title || !status) return response(res, 400, "اطلاعات ناقص");
      const findTodo = user.todos.find(
        (todo) => todo.title == title && todo.status == status
      );
      if (findTodo) return response(res, 401, "این تودو قبلا اضافه شده");
      const result = await User.updateOne(
        { email: user.email },
        { $set: { todos: [...user.todos, { title, status, description }] } }
      );
      if (result.modifiedCount)
        return response(res, 200, "تودو با موفقیت ایجاد شد");
      return response(res, 401, "متاسفانه مشکلی پیش آمده");
    case "PATCH":
      const { id, status: s } = req.body;
      if (!id || !s) return response(res, 422, "اطلاعات ناقص است");
      const updateResult = await User.updateOne(
        { "todos._id": id },
        { $set: { "todos.$.status": s } }
      );

      if (!updateResult.modifiedCount)
        return response(res, 500, "متاسفانه مشکلی پیش آمده");
      return response(res, 200, "اطلاعات با موفقبت بروزرسانی شد");
    default:
      break;
  }
}
