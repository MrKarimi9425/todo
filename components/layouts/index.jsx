import Link from "next/link";
import React from "react";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const Layout = ({ children }) => {
  const { status } = useSession();
  const logoutHandler = () => {
    signOut();
  };
  return (
    <div className="container">
      <header>
        <p>Botostart Todo App</p>
        {status === "authenticated" && (
          <button onClick={logoutHandler}>
            Logout <FiLogOut />
          </button>
        )}
      </header>
      <div className="container--main">
        <aside>
          <p>Welcome</p>
          <ul>
            <li>
              <VscListSelection />
              <Link href="/">Todos</Link>
            </li>
            <li>
              <BiMessageSquareAdd />
              <Link href="/todos/add">Add Todo</Link>
            </li>
            <li>
              <RxDashboard />
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
};

export default Layout;
