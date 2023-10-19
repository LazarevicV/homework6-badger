import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useAuth } from "../contexts/AuthContext";

export default function BadgerMessage(props) {
  const [loginStatus] = useContext(BadgerLoginStatusContext);
  const { isAuth } = useAuth();

  const handleDelete = async () => {
    if (loginStatus && loginStatus.username === props.poster) {
      try {
        const response = await fetch(
          `https://cs571.org/api/f23/hw6/messages?id=${props.id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "X-CS571-ID":
                "bid_0b4205efee70bd68a21f388da669df15d30df5e64a50ab1a879a2ff465b9c497",
            },
          }
        );

        if (response.status === 200) {
          alert("Successfully deleted the post!");
          props.onDelete();
          return;
        } else if (response.status === 401) {
          alert("You must be logged in to delete this post!");
        } else if (response.status === 401) {
          alert("You may not delete another user's post!");
        } else {
          alert("Failed to delete the post.");
        }
      } catch (error) {
        console.error("Error deleting the post:", error);
      }
    }
  };

  const dt = new Date(props.created);

  return (
    <Card style={{ margin: "0.5rem", padding: "0.5rem" }}>
      <h2>{props.title}</h2>
      <sub className="mb-2">
        Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}
      </sub>
      <br />
      <b>
        <i>{props.poster}</i>
      </b>
      <p>{props.content}</p>
      {isAuth && isAuth.username === props.poster && (
        <Button variant="danger" className="w-100" onClick={props.onDelete}>
          Delete
        </Button>
      )}
    </Card>
  );
}
