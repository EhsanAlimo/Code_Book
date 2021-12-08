import Head from "next/head";
import Login from "./components/login/Login";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="flex">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Login />
    </div>
  );
}
