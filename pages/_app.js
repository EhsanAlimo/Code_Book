import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";
import { StateProvider } from "../context/StateProvider";
import { initialState, reducer } from "../context/reducer";
// import "../styles/global.scss";
import "prismjs/themes/prism-tomorrow.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Component {...pageProps} />
      </StateProvider>
    </SessionProvider>
  );
}

export default MyApp;
