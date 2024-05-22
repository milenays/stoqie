// components/CommentList.js
import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import Notification from './Notification';

export default function CommentList({ productId }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const { data: session } = useSession();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?productId=${productId}`);
        const data = await res.json();
        setComments(data.data);
      } catch (error) {
        setMessage('Error fetching comments');
        setSeverity('error');
      }
    };

    fetchComments();
  }, [productId]);

  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
        setMessage('Comment deleted successfully');
        setSeverity('success');
      } else {
        setMessage('Error deleting comment');
        setSeverity('error');
      }
    } catch (error) {
      setMessage('Error deleting comment');
      setSeverity('error');
    }
  };

  return (
    <div>
      <List>
        {comments.map((comment) => (
          <div key={comment._id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`${comment.userId}: ${comment.rating} stars`}
                secondary={comment.content}
              />
              {session && session.user.role === 'admin' && (
                <Button 
                  color="secondary" 
                  variant="contained"
                  onClick={() => handleDelete(comment._id)}
                >
                  Delete
                </Button>
              )}
            </ListItem>
            <Divider component="li" />
          </div>
        ))}
      </List>
      <Notification 
        message={message} 
        onClose={() => setMessage('')}
        severity={severity}
      />
    </div>
  );
}