import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import BasicAlert from "../components/alert";
import { baseUrl } from "../constants/ApiUrl";

export default function SendPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const submitPost = () => {
    if ((title != "") & (description != "")) {
      axios({
        method: "POST",
        url: baseUrl + "/api/addpost",
        data: {
          title,
          description,
        },
      })
        .then((response) => {
          if (response.data.status) {
            setResponseMessage(response.data.message);
            setShowAlert(true);
            setDescription("");
            setTitle("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please write something");
    }
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
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
      {showAlert ? (
        <BasicAlert
          message={responseMessage}
          type="success"
          style={{
            marginLeft: "5px",
            width: "100%",
          }}
        />
      ) : null}
      <Button
        style={{ margin: "5px" }}
        variant="contained"
        fullWidth
        onClick={submitPost}
      >
        Submit Post
      </Button>
    </Box>
  );
}
