import { Dialog, Transition } from "@headlessui/react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Fragment, useEffect, useRef, useState } from "react";
import React from "react";
import Navbar from "./components/Navbar";
import { useContextProvider } from "./context/StateProvider";
import { db } from "../firebase";

function Edit() {
  const [{ modalDisplay, selectedBox }, dispatch] = useContextProvider();
  let [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [code, setCode] = useState();

  useEffect(() => {
    setTitle(selectedBox.title);
    setDescription(selectedBox.descript);
    setCode(selectedBox.codeValue);
  }, [selectedBox]);

  const saveHandler = async (e) => {
    e.preventDefault();
    ///https://firebase.google.com/docs/firestore/manage-data/add-data///
    await updateDoc(doc(db, "codes", selectedBox.id), {
      title: title,
      description: description,
      code: code,
      timestamp: serverTimestamp(),
    });
    closeModal();
  };

  const closeModal = () => {
    dispatch({
      type: "SET-MODAL",
      payload: false,
    });
    setIsOpen(false);
  };

  return (
    ///using https://headlessui.dev/react/dialog ///for the pop up box///
    <Transition
      show={modalDisplay}
      as={Fragment}
      enter="transition duration-500 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog open={isOpen} onClose={closeModal} className="fixed inset-1">
        <Dialog.Overlay
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={closeModal}
        />
        <Dialog.Title>
          <div className="items-center w-96 h-96 absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-indigo-500 rounded-xl">
            <form
              onSubmit={saveHandler}
              className="flex flex-col flex-1 container px-2"
            >
              <p className="text-center">Title:</p>
              <input
                type="text"
                placeholder="React Router"
                className="rounded-lg px-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="text-center">Desription:</p>
              <input
                type="text"
                placeholder="To use this code ..."
                className="rounded-lg px-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="text-center">Code:</p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="rounded-lg px-2"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></textarea>
              <button
                className="hover:bg-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-1/2 items-center flex justify-center text-center"
                onClick={saveHandler}
              >
                Save
              </button>
            </form>
          </div>
        </Dialog.Title>
        {/* ... */}
      </Dialog>
    </Transition>
  );
}

export default Edit;
