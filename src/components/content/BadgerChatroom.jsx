import React, { useEffect, useState, useContext, useRef } from "react";
import BadgerMessage from "./BadgerMessage";
import { Container, Row, Col, Pagination, Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [loginStatus] = useContext(BadgerLoginStatusContext);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const deletePost = async (id) => {
    console.log("Deleting post with id:", id);
    try {
      const response = await fetch(
        `https://cs571.org/api/f23/hw6/messages?id=${id}`,
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
        const updatedMessages = messages.filter((message) => message.id !== id);
        setMessages(updatedMessages);
        return;
      } else if (response.status === 401) {
        alert("You must be logged in to delete this post!");
      } else if (response.status === 401) {
        alert("You may not delete another user's post!");
      } else if (response.status === 404) {
        console.log("post not found");
      } else {
        alert("Failed to delete the post XD.");
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  const loadMessages = (page) => {
    fetch(
      `https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=${page}`,
      {
        headers: {
          "X-CS571-ID":
            "bid_0b4205efee70bd68a21f388da669df15d30df5e64a50ab1a879a2ff465b9c497",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setMessages(json.messages);
      });
  };

  const createPost = async () => {
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (!title || !content) {
      alert("You must provide both a title and content!");
      return;
    }

    try {
      const response = await fetch(
        `https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CS571-ID":
              "bid_0b4205efee70bd68a21f388da669df15d30df5e64a50ab1a879a2ff465b9c497",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      if (response.status === 200) {
        alert("Successfully posted!");
        loadMessages(currentPage);
      } else if (response.status === 400) {
        alert("A request must contain a 'title' and 'content'");
      } else if (response.status === 401) {
        alert("You must be logged in to post!");
      }
    } catch (error) {
      console.error("Error creating a post:", error);
    }
  };

  useEffect(() => {
    loadMessages(currentPage);
  }, [props, currentPage]);

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      <hr />
      <Row>
        <Col md={4}>
          {loginStatus ? (
            <div>
              <Form>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    ref={titleRef}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter content"
                    ref={contentRef}
                  />
                </Form.Group>
                <Button onClick={createPost}>Create Post</Button>
              </Form>
            </div>
          ) : (
            <p>You must be logged in to post!</p>
          )}
        </Col>
        <Col md={8}>
          {messages.length > 0 ? (
            <Container>
              <Row>
                {messages.map((message, index) => (
                  <Col key={index} xs={12} sm={6} md={4}>
                    <BadgerMessage
                      id={message.id}
                      title={message.title}
                      poster={message.poster}
                      content={message.content}
                      created={message.created}
                      onDelete={() => deletePost(message.id)}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          ) : (
            <p>There are no messages on this page yet!</p>
          )}
          <Pagination>
            <Pagination.Item
              active={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              1
            </Pagination.Item>
            <Pagination.Item
              active={currentPage === 2}
              onClick={() => setCurrentPage(2)}
            >
              2
            </Pagination.Item>
            <Pagination.Item
              active={currentPage === 3}
              onClick={() => setCurrentPage(3)}
            >
              3
            </Pagination.Item>
            <Pagination.Item
              active={currentPage === 4}
              onClick={() => setCurrentPage(4)}
            >
              4
            </Pagination.Item>
          </Pagination>
        </Col>
      </Row>
    </>
  );
}
