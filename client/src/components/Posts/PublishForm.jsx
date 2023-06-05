import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";

import Mediatheque from "../mediatheque/Mediatheque";

const API_PORT = process.env.REACT_APP_API_PORT;
const API_HOST = process.env.REACT_APP_API_HOST;
// icons
const axiosInstance = axios.create({
  withCredentials: true,
});
export default function PublishForm(props) {
  const {
    darkMode,
    urlFileChosen,
    setUrlFileChosen,
    selectedFile,
    setSelectedFile,
    userId,
  } = props;
  const [desc, setDesc] = useState();
  const [title, setTitle] = useState();
  const [messageError, setMessageError] = useState();

  const onFinish = () => {
    // si un fichier est sélectionné
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log("uploading...");
      // upload le fichier et l'écrase pour l'affichage suivant
      setSelectedFile(null);
      axios
        .post(`http://${API_HOST}:${API_PORT}/files/upload`, formData)
        .then((resp) => {
          // upload le fichier coté serveur et bdd, récupère l'id et publie le post
          const FileId = resp.data.id;
          console.log(resp.data);
          console.log(resp.data.type);
          const splitType = resp.data.type.split("/");
          splitType.pop();
          const type = splitType[0];
          console.log(splitType[0]);
          axiosInstance
            .post(`http://${API_HOST}:${API_PORT}/posts`, {
              description: desc,
              title: title,
              FileId: FileId,
              type: type,
              UserId: userId,
            })
            .then((resp) => {
              console.log(resp);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else {
      setMessageError("ajouter un fichier");
    }
    console.log(selectedFile);
  };

  return (
    <>
      <div className="w-8/12 flex items-start">
        <span className="text-sm">titre</span>
      </div>
      <input
        style={{ background: "none" }}
        className="h-10 outline-none py-1.5  bg-none px-3 border-2 border-[#924a4a] rounded-lg w-8/12
hover:border-[#7c3d3d]"
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <div className="w-8/12 flex items-start mt-3">
        <span className="text-sm">description</span>
      </div>

      <input
        style={{ background: "none" }}
        className="h-10 outline-none py-1.5 bg-none px-3 border-2 border-[#924a4a] rounded-lg mb-3 w-8/12
hover:border-[#7c3d3d]"
        type="text"
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      ></input>
      <div className="text-red-600 font-semibold">{messageError}</div>
      <Mediatheque
        darkMode={darkMode}
        urlFileChosen={urlFileChosen}
        setUrlFileChosen={setUrlFileChosen}
        userFile={null}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={onFinish}
          className="bg-[#924a4a] hover:bg-[#7c3d3d] rounded-md py-1  w-20  text-sm px-3 text-white"
        >
          Publier
        </button>
      </div>
    </>
  );
}
