import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Signin = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
    redirect: false,
  });
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const signinHandler = async () => {
    if (data.email && data.password) {
      signIn("credentials", data).then((data) =>
        !data.error ? router.push("/") : console.log(data)
      );
    }
  };
  return (
    <div className="signin-form">
      <h3>Login Form</h3>
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
      <button onClick={signinHandler}>Login</button>
      <div>
        <p>Create an account?</p>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Signin;
