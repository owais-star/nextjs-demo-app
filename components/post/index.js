import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { baseUrl } from "../../constants/ApiUrl";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BasicAlert from "../alert";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  border: "3px solid #1976d2",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function PostCard({ posts }) {
  const [postsData, setPostsData] = useState(posts);
  const [editModal, setEditModal] = useState(false);
  const [editPost_id, setEditPost_Id] = useState(null);
  const [deletePost_id, setDeletePost_id] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleEditModalOpen = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditPost_Id(item._id);
    setEditModal(true);
  };
  const handleEditModalClose = () => setEditModal(false);

  const handleDeleteModalOpen = (_id) => {
    setDeleteModal(true);
    setDeletePost_id(_id);
  };
  const handleDeleteModalClose = () => {
    setDeleteModal(false);
    setDeletePost_id(null);
  };

  const handleUpdatePost = () => {
    axios({
      method: "PUT",
      url: baseUrl + "/api/updatepost",
      data:{
        title,
        description
      },
      headers: {
        editPost_id,
      },
    })
      .then((response) => {
        if (response.data.status) {
          setEditModal(false);
          arrayUpdate(postsData, editPost_id);
          setResponseMessage(response.data.message);
          setShowAlert(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };
  const handleDeletePost = () => {
    axios({
      method: "DELETE",
      url: baseUrl + "/api/deletepost",
      headers: {
        deletePost_id,
      },
    })
      .then((response) => {
        if (response.data.status) {
          setDeleteModal(false);
          arrayRemove(postsData, deletePost_id);
          setResponseMessage(response.data.message);
          setShowAlert(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };
  function arrayRemove(arr, value) {
    let filteredArray = arr.filter((data) => data._id != value);
    setPostsData(filteredArray);
  }
  function arrayUpdate(posts, value) {
    let objIndex = posts.findIndex((obj) => obj._id == value);
    posts[objIndex].title = title;
    posts[objIndex].description = description;
  }
  return (
    <>
      {showAlert && (
        <BasicAlert
          message={responseMessage}
          type="success"
          style={{
            position: "absolute",
            top: "72px",
            right: "4px",
            width: "98%",
          }}
        />
      )}
      {postsData.map((item, index) => {
        return (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <Card style={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="140"
                image={"https://source.unsplash.com/random"}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<EditIcon />}
                  variant="outlined"
                  size="small"
                  onClick={() => handleEditModalOpen(item)}
                >
                  Edit Post
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  size="small"
                  onClick={() => handleDeleteModalOpen(item._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}

      <Modal
        open={editModal}
        onClose={handleEditModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            style={{ margin: "5px", padding: "20px" }}
          >
            <TextField
              style={{ margin: "5px" }}
              id="outlined-basic"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              variant="outlined"
              fullWidth
            />
            <TextField
              style={{ margin: "5px" }}
              id="outlined-basic"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              variant="outlined"
              fullWidth
            />
            <Button
              style={{ margin: "5px" }}
              variant="outlined"
              onClick={handleEditModalClose}
            >
              Cancel
            </Button>
            <Button
              style={{ margin: "5px" }}
              variant="contained"
              onClick={handleUpdatePost}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are You Sure You want to delete this Post?
          </Typography>
          <Button size="small" onClick={handleDeletePost}>
            Yes
          </Button>
          <Button size="small" onClick={handleDeleteModalClose}>
            No
          </Button>
        </Box>
      </Modal>
    </>
  );
}
