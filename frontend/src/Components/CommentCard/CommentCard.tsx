import React from 'react';
import {IComments} from '../../types';

interface Props {
  comment: IComments;
}
const CommentCard: React.FC<Props> = ({comment}) => {
  return (
    <div  className="text-start border rounded-4 p-3 mb-2">
      <h6>{comment.user.user}</h6>
      <hr/>
      <p>{comment.text}</p>
    </div>
  );
};

export default CommentCard;