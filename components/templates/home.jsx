import { request } from "@/utils/api";
import React, { useEffect, useState } from "react";
import Task from "../modules/task";

const Home = () => {
  const [todos, setTodos] = useState({});
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    request("/api/todos", "GET").then((data) => {
      data.status == 200 ? setTodos(data.data) : console.log(data);
    });
  };
  return (
    <div className="home-page">
      <div className="home-page--todo">
        <p>Todo</p>
        <Task data={todos.todo} fetchData={fetchData} next="inProgress" />
      </div>
      <div className="home-page--inProgress">
        <p>In Progress</p>
        <Task
          data={todos.inProgress}
          fetchData={fetchData}
          next="review"
          back="todo"
        />
      </div>
      <div className="home-page--review">
        <p>Review</p>
        <Task
          data={todos.review}
          fetchData={fetchData}
          next="done"
          back="inProgress"
        />
      </div>
      <div className="home-page--done">
        <p>Done</p>
        <Task data={todos.done} fetchData={fetchData} back="review" />
      </div>
    </div>
  );
};

export default Home;
