import {
  Button,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import PostForm from "../PostForm";

interface AddPostModalProps {
  refresh: () => void;
}

const AddPostModal: React.FunctionComponent<AddPostModalProps> = ({ refresh }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <>
      <Button
        onClick={()=>setIsOpen(true)}
        variant="contained"
        style={{ width: "680px", margin: "10px" }}
      >
        Hey, quoi de neuf à Orgeval ? <p>&#129299;</p>
      </Button>
  
       <PostForm refresh={refresh} isopen={isOpen} closeModal={()=>setIsOpen(false)}/>
    </>
  );
};

export default AddPostModal;
