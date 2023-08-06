import React from "react";

const ProfileForm = ({ data, setData, submitHandler }) => {
  const changeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div className="profile-form__input">
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name: </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={data.lastname}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="passworf"
            name="password"
            value={data.password}
            onChange={changeHandler}
          />
        </div>
      </div>
      <button onClick={submitHandler}>Submit</button>
    </>
  );
};

export default ProfileForm;
