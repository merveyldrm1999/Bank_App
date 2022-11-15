import { Button, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Router from "next/router";
import axios from "axios";

const userSchema = yup.object().shape({
  username: yup
    .string("Geçersiz Değer Girdin")
    .required("Lütfen zorunlu alanları doldurunuz"),
  password: yup
    .string("Geçersiz Değer Girdin")
    .required("Lütfen zorunlu alanları doldurunuz"),
});

export default function Home() {
  const [defaultValues, setDefaultValues] = useState({
    username: "",
    password: "",
  });
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues,
  });

  const onLogin = (data) => {
    console.log(data);
    axios.post("http://127.0.0.1:80/api/login", data).then((res) => {
      if (res.status === 200) {
        console.log(res);
        localStorage.setItem("jwt", res.data.data);
        Router.push("/bank");
      } else {
        alert("red");
      }
    });

    // if (res.username === "merve" && res.password == "1") {
    //   Router.push("/bank");
    // } else {
    //   alert("giremezsin");
    // }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit((data) => onLogin(data))}>
        <Grid
          mt={20}
          sx={{ border: 1 }}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item pt={2}>
            <label>username</label>
          </Grid>
          <Grid item pt={2}>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value, ref } }) => (
                <TextField
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </Grid>
          <Grid item pt={2}>
            <label>password</label>
          </Grid>
          <Grid item pt={2}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, ref } }) => (
                <TextField
                  type={"password"}
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </Grid>
          <Grid item pt={2}>
            <Button type="submit" variant="contained" color="success">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
