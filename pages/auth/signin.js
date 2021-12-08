import {
  getProviders,
  signIn as SignIntoProvider,
  useSession,
} from "next-auth/react";
import Navbar from "../components/Navbar";
///Browser
function signIn({ providers }) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2  px-14 text-center bg-gradient-to-br from-purple-900 via-yellow-400 to-green-600">
        <img src="/image/codeLogo.jpeg" alt="" className="w-80 rounded-2xl" />
        <div className="mt-40">
          {/* https://next-auth.js.org/configuration/pages#sign-in-page    //// code comes from */}
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <p className="italic font-medium text-black">
                Please Sign In in my web application to be able to upload, save,
                delete and edit your usefull codes and have your own CodeBook
                account.{" "}
              </p>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white mt-10"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

//server////
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
export default signIn;
