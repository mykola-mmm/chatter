import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
    defaultValues: {
      email: "test1@gmail.com",
      password: "123456",
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    console.log(data)

    if (!data.payload) {
      return alert('Authorization failed!')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data,payload.token)
    }
  };

  console.log('isAuth - ' + isAuth)
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type = 'email'
          error = {Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Provide an email"})}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error = {Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
          {...register("password", { required: "Provide a password"})}
          />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
};
