import { signIn, useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";

function Login() {
  const { data: session } = useSession();
  //   console.log(session);
  const [loading, setLoading] = useState(false);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const codeRef = useRef(null);

  const router = useRouter();

  const uploadCode = async (event) => {
    event.preventDefault();
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    //   if (loading) return;
    //   setLoading(true);
    // 1) create a post and add to firebase 'codes' collection
    // 2) get the post ID for the post
    if (
      titleRef.current.value &&
      descriptionRef.current.value &&
      codeRef.current.value
    ) {
      const docRef = await addDoc(collection(db, "codes"), {
        username: session.user.username,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        code: codeRef.current.value,
        timestamp: serverTimestamp(),
        profilePic: session.user.image,
      });
      alert("Your Code has been succesfully uploaded to the your code store");
    } else {
      alert("To store your code you need to fill out all the form's inputs");
    }

    // console.log("New doc added with ID", docRef.id);
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    codeRef.current.value = "";
  };

  return (
    <div>
      <div className="mt-20 relative">
        <div className="items-center w-96 h-96 absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-indigo-500 rounded-xl">
          <form
            action=""
            className="flex flex-col flex-1 container px-2"
            onSubmit={uploadCode}
          >
            <p className="text-center">Title:</p>
            <input
              type="text"
              placeholder="React Router"
              className="rounded-lg px-2"
              ref={titleRef}
              required
            />
            <p className="text-center">Desription:</p>
            <input
              type="text"
              placeholder="To use this code ..."
              className="rounded-lg px-2"
              ref={descriptionRef}
              required
            />
            <p className="text-center">Code:</p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="rounded-lg "
              ref={codeRef}
              required
            ></textarea>
            <button
              className="hover:bg-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              onClick={uploadCode}
            >
              Submitt
            </button>
          </form>
        </div>
        <img
          src="/image/codepic.jpeg"
          alt="fff"
          className="w-screen h-screen"
        />
      </div>
    </div>
  );
}

export default Login;
