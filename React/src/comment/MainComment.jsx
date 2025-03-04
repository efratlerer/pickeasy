

import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../Loader";

const MainComment = ({ question, IsDialogOpen, handleCloseDialog }) => {
    const myUser = useSelector((state) => state.user.myUser);
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(IsDialogOpen); // דיאלוג ייפתח אוטומטית
    const allComments = useSelector((state) => state.comment.listcomment);
    const [relevantComments, setRelevantComments] = useState([]);


    const handleClose = () => {
        setOpen(false);
        if (handleCloseDialog) {
            handleCloseDialog();
        }
    };

    useEffect(() => {
        setOpen(IsDialogOpen); // עדכון המצב הפנימי במקרה של שינוי בפרופס
    }, [IsDialogOpen]);


    useEffect(() => {
        if (question) {

            // בדיקת האם יש תגובות ברידקס
            if (allComments.length === 0) {

                setLoading(true);
                // קריאה לשרת אם אין תגובות
                dispatch({ type: 'GET_COMMENT' }).finally(() => setLoading(false));


            }
            else {
                setLoading(false)
            }//מסנן את התגובות המאימות לשאלה
            const filterComments = question && question.id
                ? allComments.filter(c => c.questions?.id === question.id)
                : [];
            setRelevantComments(filterComments)

        }
    }, [dispatch]);


    //add comment
    const handleAddComment = () => {
        if (!comment || !myUser || !question) return;

        setLoading(true);
        dispatch({ type: 'ADD_COMMENT', payload: { comment, myUser, question } })
            .then(() => {
                // עדכון רשימת התגובות ברידקס
                setRelevantComments([...relevantComments, { id: Date.now(), comment, users: myUser, questions: question }])

                setComment('');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>

            <Dialog
                open={open} onClose={handleClose}
            >
                <DialogTitle>תגובות</DialogTitle>
                <DialogContent>

                    {loading ? (
                        <Loader />
                    ) : (
                        <List>
                            {relevantComments && relevantComments.length > 0 ? (
                                relevantComments.map((com) => (
                                    <ListItem key={com.id} alignItems="flex-start">
                                        <ListItemAvatar>
                                            {com.users?.profile && (
                                                <Avatar>
                                                    <img
                                                        src={`data:image/jpg;base64,${com.users.profile}`}
                                                        alt={com.users.username[0]}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </Avatar>
                                            )}
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Typography variant="body1">{com.comment}</Typography>}
                                            secondary={<Typography variant="caption" color="textSecondary">User {com.users?.username}</Typography>}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    אין תגובות לשאלה זו.
                                </Typography>
                            )}
                        </List>
                    )}
                    <TextField
                        label="הוסף תגובה"
                        fullWidth
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{ marginTop: 16 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        סגור
                    </Button>
                    <Button onClick={handleAddComment} color="primary">
                        הוסף תגובה
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

};

export default MainComment;
