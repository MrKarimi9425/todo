import User from "@/models/User";
import { response } from "@/utils/api";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await connectDB();
  const session = await getSession({ req });
  if (!session) return response(res, 401, "لطفا وارد حساب کاربری خود شوید");
  const user = await User.findOne({ email: session.user.email });
  if (!user) return response(res, 404, "کاربری پیدا نشد");

  const id = req.query.id;
  switch (req.method) {
    case "GET":
      const todo = user.todos.find((todo) => todo.id == id);
      if (!todo) return response(res, 404, "تودویی با این شمارنده وجود ندارد");
      return response(res, 200, "", todo);
    case "PATCH":
      const { title, description, status } = req.body;
      if (!title || !status) return response(res, 422, "اطلاعات ناقص");

      const updateResult = await User.updateOne(
        { "todos._id": id },
        {
          $set: {
            "todos.$.title": title,
            "todos.$.status": status,
            "todos.$.description": description,
          },
        }
      );
      if (!updateResult.modifiedCount)
        return response(res, 500, "متاسفانه مشکلی پیش آمده");
      return response(res, 200, "تودو با موفقیت آپدیت شد");
    default:
      break;
  }
}
