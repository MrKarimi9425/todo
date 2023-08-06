import React, { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import RadioButton from "../elements/radioButton";
import { request } from "@/utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Update = ({ data }) => {
  const router = useRouter();
  const [todo, setTodo] = useState(() => {
    if (!data["description"]) return { ...data, description: "" };
    return data;
  });

  const changeHandler = (e) =>
    setTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const updateHandler = () => {
    request(`/api/todos/${router.query.id}`, "PATCH", todo).then((data) => {
      if (data.status == 200) {
        toast.success("اطلاعات با موفقیت بروز شد");
        setTimeout(() => {
          router.back();
        }, 2000);
      }
      console.log(data);
    });
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Update Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label>Title :</label>
          <input
            value={todo.title}
            id="title"
            name="title"
            type="text"
            onChange={changeHandler}
          />
        </div>
        <div className="add-form__input--first">
          <label>Description :</label>
          <input
            value={todo.description}
            id="description"
            name="description"
            type="text"
            onChange={changeHandler}
          />
        </div>
        <div className="add-form__input--second">
          <RadioButton
            changeHandler={changeHandler}
            title="Todo"
            value="todo"
            checked={todo.status == "todo"}
          >
            <BsAlignStart />
          </RadioButton>
          <RadioButton
            changeHandler={changeHandler}
            title="InProgress"
            value="inProgress"
            checked={todo.status == "inProgress"}
          >
            <FiSettings />
          </RadioButton>
          <RadioButton
            changeHandler={changeHandler}
            title="Reveiw"
            value="review"
            checked={todo.status == "review"}
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            changeHandler={changeHandler}
            title="Done"
            value="done"
            checked={todo.status == "done"}
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        <button onClick={updateHandler}>Update</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Update;
