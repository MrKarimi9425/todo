import { request } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const signupHandler = () => {
    if (data.email && data.password && data.confirmPassword) {
      request("api/auth/signup", "POST", data).then((data) =>
        data.status == 201 ? router.push("/signin") : console.log(data)
      );
    }
  };
  return (
    <div className="signin-form">
      <h3>Registration Form</h3>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={changeHandler}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={changeHandler}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={changeHandler}
      />
      <button onClick={signupHandler}>Register</button>
      <div>
        <p>Have an account?</p>
        <Link href="/signin">Sign in</Link>
      </div>
    </div>
  );
};

export default Signup;
