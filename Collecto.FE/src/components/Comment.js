import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Card,
  Stack,
} from "react-bootstrap";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Pusher from "pusher-js";
import API_BASE_URL from "../apiConfig";

const Comment = ({ userId, itemId }) => {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pusher = new Pusher("c6ee54717f876c338b30", {
      cluster: "ap3",
    });

    const channel = pusher.subscribe(`item-comments-${itemId}`);

    channel.bind("new-comment", (data) => {
      const transformedComment = {
        commentId: data.CommentId,
        userId: data.UserId,
        fullName: data.FullName,
        itemId: data.ItemId,
        content: data.Content,
        createdAt: data.CreatedAt,
      };
      setComments((prevComments) => [...prevComments, transformedComment]);
    });

    return () => {
      pusher.unsubscribe(`item-comments-${itemId}`);
      pusher.disconnect();
    };
  }, [itemId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/Comment/get-comments/${itemId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [itemId]);

  const sendComment = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/Comment/create-comment`, {
        userId: userId,
        itemId: Number(itemId),
        content: content,
      });

      console.log("Comment sent successfully");

      setContent("");
    } catch (error) {
      console.error("Error sending comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    sendComment();
  };

  return (
    <Container className="mt-5">
      <p>{userId}</p>
      <Row>
        <Col xs={9}>
          <Form onSubmit={handleCommentSubmit}>
            <Form.Group controlId="commentTextArea">
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="Enter your comment"
                value={content}
                onChange={handleCommentChange}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs={3}>
          <Button
            variant="primary"
            type="submit"
            onClick={handleCommentSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Sending...</span>
              </>
            ) : (
              "Comment"
            )}
          </Button>
        </Col>
      </Row>
      <div>
        {comments.map((comment) => (
          <Card key={comment.commentId} className="mt-2">
            <Stack direction="horizontal" className="p-2">
              <small className="fw-bold me-2">{comment.fullName}</small>
              <small className="text-muted">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, addPrefix: false })}</small>
            </Stack>
            <Card.Text className="p-2">
              {comment.content}
            </Card.Text>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Comment;