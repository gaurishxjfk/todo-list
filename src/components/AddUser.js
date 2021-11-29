/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { Button, Container, TextField } from "@mui/material";
import React, { useEffect } from "react";
import faker from "faker";
import { useForm } from "react-hook-form";
import { UserState } from "../context";

const modalStyles = {
  padding: 0.5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: 300,
  gap: 1,
};

const AddUser = (props) => {
  const { addUserhandleCloseModal } = props;

  const { register, handleSubmit } = useForm();

  const { users, setUsers } = UserState();

  const onSubmit = (data) => {
    const id = Math.floor(Math.random() * 100) + 1;

    Array.isArray(users)
      ? setUsers([
          ...users,
          { id, ...data, isAdmin: false, Avatar: faker.random.image() },
        ])
      : setUsers([
          { id, ...data, isAdmin: false, Avatar: faker.random.image() },
        ]);

    addUserhandleCloseModal();
  };

  useEffect(() => {
    localStorage.setItem(`userList`, JSON.stringify(users));
  }, [users]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container sx={modalStyles}>
        <div>
          <TextField
            type="text"
            placeholder="First name"
            {...register("First_name", { required: true, maxLength: 80 })}
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="text"
            placeholder="Last name"
            {...register("Last_name", { required: true, maxLength: 100 })}
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="text"
            placeholder="Username"
            {...register("Username", { required: true })}
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="password"
            placeholder="Password"
            {...register("Password", { required: true, maxLength: 10 })}
            fullWidth
          />
        </div>
        <div>
          <Button type="submit" className="btn_submitForm">
            Add User{" "}
          </Button>
        </div>
      </Container>
    </form>
  );
};

export default AddUser;
