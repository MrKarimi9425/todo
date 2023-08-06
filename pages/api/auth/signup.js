import User from "@/models/User";
import { response } from "@/utils/api";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  const { email, password, confirmPassword } = req.body;
  await connectDB(res);
  if (!email || !password || !confirmPassword)
    return response(res, 400, "اطلاعات ناقص");
  if (confirmPassword != password)
    return response(res, 200, "تکرار کلمه علور مطابقت ندارد");
  const user = await User.findOne({ email });
  if (user)
    return response(res, 200, "حساب کاربری با این ایمیل از قبل وجود دارد");
  const hashedPassword = await hashPassword(password);
  const signup = await User.create({
    email,
    password: hashedPassword,
  });

  if (signup)
    return response(res, 201, "حساب کاربری با موقفیت ایجاد شد", signup);
  return response(res, 500, "متاسفانه مشکلی پیش آمده");
}
