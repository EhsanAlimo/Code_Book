import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import signIn from "../auth/signin";
import LogoutIcon from "@mui/icons-material/Logout";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
function Navbar() {
  const { data: session } = useSession();
  // console.log(session);
  return (
    <div className="flex justify-between items-center w-screen bg-yellow-200 h-20 z-10 fixed top-0 bg-gradient-to-r from-gray-900 via-blue-700 to-purple-500 shadow-inner ">
      <div>
        <Link href="/">
          <h2 className="m-5 text-4xl font-black bg-clip-text text-transparent bg-gradient-to-l from-purple-100 to-yellow-300 cursor-pointer">
            CodeBook
          </h2>
        </Link>
      </div>
      <div className="h-11 flex justify-center items-center">
        <div className="flex justify-between">
          {session ? (
            <p>We are happy to see you here {session?.user.name}</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="mr-8 flex items-center justify-between gap-4">
        {session ? (
          <>
            <Link href="/CodeStore">
              <a>Code Store</a>
            </Link>
            <Link href="/CodeStore">
              <ArchiveOutlinedIcon className="cursor-pointer" />
            </Link>
            <LogoutIcon onClick={signOut} className="cursor-pointer" />
            <img
              onClick={signOut}
              src={session.user.image}
              alt="profile pic"
              className="h-10 rounded-full cursor-pointer w-10"
            />
          </>
        ) : (
          <Link href="/auth/signin">
            <a className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-l from-green-300 to-yellow-300">
              Sign In
            </a>
          </Link>
          //   <button onClick={signIn}>Sign In</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
