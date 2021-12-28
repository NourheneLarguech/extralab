import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { postDataType } from "../../Api/Types";
import PostForm from "../PostForm";
import { getAvatar } from "../../Api/Index";
interface PostListProps {
  // ? :pas obligatoire
  data?: postDataType[];
  handleDelete: (id: number) => void;
  refresh: () => void;
}

const PostList: React.FunctionComponent<PostListProps> = ({
  data,
  handleDelete,
  refresh,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<postDataType>(
    {} as postDataType
  );

  const handleEdit = (post: postDataType) => {
    setCurrentPost(post);
    setIsOpen(true);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "gray",
          display: "flex",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        <div style={{ width: "700px" }}>
          {
            // si existe afficher les données
            data &&
              data.map((post, key) => (
                <Card key={key} style={{ margin: "10px" }}>
                  <CardHeader
                    avatar={
                      <Avatar alt={post.author} src={getAvatar(post.author)} />
                    }
                    title={post.author}
                    subheader={new Date(post.creationDate).toLocaleString("fr-FR", {
                      dateStyle: "medium",
                    }) +
                    " à " +
                    new Date(post.creationDate).toLocaleString("fr-FR", {
                      timeStyle: "short",
                    })}
                    action={
                      <span>
                        <IconButton onClick={() => handleEdit(post)}>
                          <ModeEditIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(post.id)}>
                          <DeleteForeverIcon color="error" />
                        </IconButton>
                      </span>
                    }
                  />
                  <CardContent
                    style={{ paddingLeft: "75px", paddingTop: "0px" }}
                  >
                    <Typography variant="body1">{post.postContent}</Typography>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {post.tags.map((tag, key) => (
                        <div
                          key={key}
                          style={{
                            backgroundColor: "#125da7",
                            color: "white",
                            width: "fit-content",
                            padding: "3px",
                            marginRight: "5px",
                            borderRadius: "3px",
                          }}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
          }
        </div>
      </div>
      {isOpen && (
        <PostForm
          refresh={refresh}
          isopen={isOpen}
          closeModal={() => setIsOpen(false)}
          data={currentPost}
        />
      )}
    </>
  );
};

export default PostList;
