import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../comp/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    // if (localStorage.getItem("jwt") === null) {
    //   Router.Push("/");
    // }
  }, []);

  return (
    <>
      <Layout>
        {" "}
        <Component {...pageProps} />{" "}
      </Layout>
    </>
  );
}

export default MyApp;
