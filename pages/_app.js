import { useRouter } from "next/router";
import Layout from "../comp/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

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
