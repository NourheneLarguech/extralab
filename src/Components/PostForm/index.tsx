import {
  Modal,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
  CardActions,
  Alert,
  Collapse,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { postDataType, tagType } from "../../Api/Types";
import {
  getAvatar,
  getRandomUserName,
  submitPostData,
  updatePost,
} from "../../Api/Index";
interface PostFormProps {
  isopen: boolean;
  closeModal: () => void;
  refresh: () => void;
  data?: postDataType;
}

const PostForm: React.FunctionComponent<PostFormProps> = ({
  isopen,
  closeModal,
  refresh,
  data,
}) => {
  const [tags, setTags] = useState<tagType[]>([]);
  const [formText, setFormText] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleTags = (_tag: tagType) => {
    if (tags.includes(_tag)) {
      //supprime le tag s'il existe deja
      setTags(tags.filter((el) => el !== _tag));
    } else {
      //ajoute le tag s'il n'existe pas
      setTags((oldArray) => [...oldArray, _tag]);
    }
  };

  const handleSubmit = () => {
    
    if (formText.length===0) {
      console.log("Please fill the text field")
      setOpenAlert(true)
      return
    }
    if (data) {
      // si les données sont passés en props le formulaire execute une requette UPDATE
      const _data = {
        ...data,
        creationDate: new Date(),
        postContent: formText,
        tags: tags,
      };
      updatePost(_data).then((response) => {
        if (response) {
          //Close Modal
          handleClose();
          //refresh Data
          refresh();
        } else {
          console.log("Could not Update item");
        }
      });
    } else {
      // if NO data is parsed the component will add new post

      const data: postDataType = {
        id:0,
        author: user,
        creationDate: new Date(),
        postContent: formText,
        tags: tags,
      };
      //Send Data
      //service : fonction asynchrone qui fait la communication avec  backend
      submitPostData(data).then((response) => {
        if (response) {
          //Close Modal
          handleClose();
          //refresh Data
          refresh();
        } else {
          console.log("Could not Add item");
        }
      });
    }
  };

  // ferme le Modal et reinitialise les states
  const handleClose = () => {
    closeModal();
    setFormText("");
    setTags([]);
    setUser("");
  };

  // cette fonction s'execute lorsque le composant s'ouvre
  useEffect(() => {
    // si les données sont passés comme props, ils seront ajoutés en state si non un Random utilisateur sera selectioné
    data && setFormText(data.postContent);
    data && setTags(data.tags);
    data ? setUser(data.author) : setUser(getRandomUserName());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isopen]);
  
  return (
    <Modal open={isopen} onClose={handleClose}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
        }}
      >
        <CardHeader
          style={{ marginTop: "-30px" }}
          title="Créer une publication"
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />

        <CardContent>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Avatar alt={user} src={getAvatar(user)} />
            <Typography variant="h6" component="h2">
              &nbsp; {user}
            </Typography>
          </div>

          <TextField
            multiline
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
            value={formText}
            onChange={(event) => setFormText(event.target.value)}
          />
          <Collapse in={openAlert}>
          <Alert
          severity="error"
            action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          svp remplir le champ de text!!!
        </Alert>
        </Collapse>
          <div>
            <Button
              onClick={() => handleTags("Signalement")}
              variant={tags.includes("Signalement") ? "contained" : "outlined"}
              style={{ marginRight: "5px" }}
            >
              Signalement
            </Button>
            <Button
              onClick={() => handleTags("Intervention")}
              variant={tags.includes("Intervention") ? "contained" : "outlined"}
            >
              Intervention
            </Button>
          </div>
        </CardContent>
        <CardActions>
          <div style={{ marginLeft: "auto" }}>
            <Button variant="text" color="error" onClick={handleClose}>
              Annuler
            </Button>
            <Button
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              onClick={handleSubmit}
            >
              Publier ce message
            </Button>
          </div>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default PostForm;
