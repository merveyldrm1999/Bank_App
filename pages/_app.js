// import { Router } from "@mui/icons-material";
import Router from "next/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../comp/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
