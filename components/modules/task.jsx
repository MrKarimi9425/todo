import React from "react";
import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { request } from "@/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";

const Task = ({ data, fetchData, next, back }) => {
  const changeHandler = (item, status) => {
    request("/api/todos", "PATCH", { id: item._id, status }).then((data) =>
      data.status == 200 ? fetchData() : console.log(data)
    );
  };
  return (
    <div className="tasks">
      {data?.map((item) => (
        <div key={item._id} className="tasks__card">
          <Link href={`/todos/${item._id}`}>
            <span className={item.status}></span>
            <RiMastodonLine />
            <h4>{item.title}</h4>
            <h5>{item?.description}</h5>
          </Link>
          <div>
            {back ? (
              <button
                className="button-back"
                onClick={() => changeHandler(item, back)}
              >
                <BiLeftArrow />
                Back
              </button>
            ) : null}
            {next ? (
              <button
                className="button-next"
                onClick={() => changeHandler(item, next)}
              >
                <BiRightArrow />
                Next
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;
