import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import CodeBox from "./components/CodeBox";
import Navbar from "./components/Navbar";
import Edit from "./Edit";

function CodeStore({ docco }) {
  const [codes, setCodes] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "codes"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setCodes(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db]);

  console.log(codes);
  //   console.log(codes[0].data().code);
  return (
    <div className="pt-20 bg-gray-900  ">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 m-2 lg:m-4">
        {codes?.map((c) => (
          <CodeBox
            key={c.id}
            id={c.id}
            codeValue={c.data().code}
            descript={c.data().description}
            tarikh={c.data().timestamp}
            title={c.data().title}
            userName={c.data().username}
            profile={c.data().profilePic}
            docco={docco}
          />
        ))}
      </div>
      <Edit />
    </div>
  );
}

export default CodeStore;
