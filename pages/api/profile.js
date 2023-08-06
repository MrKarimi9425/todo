import User from "@/models/User";
import { response } from "@/utils/api";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await connectDB(res);

  const session = await getSession({ req });
  if (!session) return response(res, 401, "لطفا وارد حساب کاربری خود شوید");
  const user = await User.findOne({ email: session.user.email });
  if (!user) return response(res, 404, "کاربری پیدا نشد");
  switch (req.method) {
    case "GET":
      return response(res, 200, "", {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      });
    case "POST":
      const { name, lastname, password } = req.body;

      const verify = await verifyPassword(password, user.password);
      if (!verify) return response(res, 422, "کلمه عبور اشتباه است");
      user.name = name;
      user.lastname = lastname;
      if (user.save())
        return response(res, 200, "پروفایل بروزرسانی شد", {
          name,
          lastname,
          email: user.email,
        });
      return response(res, 500, "متاسفانه مشکلی پیش آمده");

    case "PATCH":
      const {
        name: _name,
        lastname: _lastname,
        password: _password,
        id,
      } = req.body;
      if (!_name || !_lastname) return response(res, 422, "اطلاعات ناقص");
      const _verify = await verifyPassword(_password, user.password);
      if (!_verify) return response(res, 422, "کلمه عبور اشتباه است");
      const updateResult = await User.updateOne(
        { _id: id },
        { $set: { name: _name, lastname: _lastname } }
      );
      if (!updateResult.modifiedCount)
        return response(res, 500, "متاسفانه مشکلی پیش آمده");
      return response(res, 200, "اطلاعات پروفایل با موفقیت بروز شد");
    default:
      break;
  }
}
