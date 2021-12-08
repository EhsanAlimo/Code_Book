import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useContextProvider } from "../../context/StateProvider";
import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import js from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
// SyntaxHighlighter.registerLanguage("javascript", js);

function CodeBox({
  id,
  codeValue,
  descript,
  tarikh,
  title,
  userName,
  profile,
}) {
  //   console.log(tarikh);
  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       prism.highlightAll();
  //     }
  //   }, []);

  const [{ modalDisplay }, dispatch] = useContextProvider();
  const editHandler = () => {
    const thisBox = {
      id,
      codeValue,
      title,
      descript,
    };
    dispatch({
      type: "SET-BOX",
      payload: thisBox,
    });
    dispatch({
      type: "SET-MODAL",
      payload: true,
    });
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete it permanently?")) {
      await deleteDoc(doc(db, "codes", id));
    }
  };

  return (
    <div className="border w-full shadow-sm rounded-xl  bg-blue-300  ">
      <div className="flex space-x-2 p-2">
        <div className="flex justify-center items-center">
          {profile ? (
            <img src={profile} alt="" className="h-10 w-10 rounded-full" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-400 text-white font-bold flex justify-center items-center">
              ?
            </div>
          )}
        </div>
        <div className="px-2 ">
          <p className="">{userName}</p>
          <p className="text-gray-400 ">
            {new Date(tarikh?.toDate()).toLocaleString()}
          </p>
        </div>
        <div className="flex-grow">
          <p className="text-right font-bold ">{title}</p>
          <p className="text-right">{descript}</p>
        </div>
      </div>
      <div className="border min-h-[300px] p-2">
        {/* <p className="">{codeValue}</p> */}
        {/* <pre class="language-javascript"> */}
        {/* <code>{codeValue}</code> */}
        {/* </pre> */}
        <SyntaxHighlighter
          language="javascript"
          className="h-[300px] overflow-scroll"
        >
          {codeValue}
        </SyntaxHighlighter>
      </div>
      <div className="p-2 flex justify-between items-center">
        <button onClick={deleteHandler}>Delete</button>
        <button onClick={editHandler}>Edit</button>
      </div>
    </div>
  );
}

export default CodeBox;
