import Link from "next/link";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = ({ data }) => {
  return (
    <div className="profile-data">
      <div>
        <span>title: </span>
        <p>{data?.title}</p>
      </div>
      <div>
        <span>Description: </span>
        <p>{data?.description}</p>
      </div>
      <div className="add-form__input--second">
        <p className={data?.status}>{data?.status}</p>
      </div>
      <button>
        <Link href={`/todos/update/${data._id}`}>Update</Link>
      </button>
      <ToastContainer />
    </div>
  );
};

export default Todo;
