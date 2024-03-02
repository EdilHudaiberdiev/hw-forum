import {Button} from '@mui/material';
import React, {FormEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../app/hooks';
import {AppDispatch} from '../../app/store';
import {addComment, getComments} from '../../Features/comments/CommentsThunk';
import {selectUser} from '../../Features/users/UsersSlice';

interface Props {
  post_id: string | undefined;
}
const AddCommentForm: React.FC<Props> = ({post_id}) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const [text, setText] = useState('');
  const submitFormComment = async (e: FormEvent) => {
    e.preventDefault();

    if (post_id && text.trim().length > 0) {
      try {
        await dispatch(addComment({post_id:post_id, comment: text}));
        await dispatch(getComments(post_id));
        setText('');
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (post_id && user) && (
    <form onSubmit={submitFormComment} className="d-flex">
      <div className="w-50">
        <input
          value={text}
          placeholder="Type comment"
          type="text" className="form-control"
          onChange={e => setText(e.target.value)}
        />
      </div>
      <Button disabled={text.trim().length === 0} type="submit">Add comment</Button>
    </form>
  );
};

export default AddCommentForm;