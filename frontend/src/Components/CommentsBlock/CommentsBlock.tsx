import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import CommentCard from '../CommentCard/CommentCard';
import Spinner from '../UI/Spinner/Spinner';

const CommentsBlock = () => {
  const comments = useSelector((state: RootState) => state.comments.comments);
  const commentsLoading = useSelector((state: RootState) => state.comments?.isLoading.get);
  const addCommentsLoading = useSelector((state: RootState) => state.comments?.isLoading.add);

  return (
    <>
      {commentsLoading || addCommentsLoading  ? <Spinner/> :
        <>
          {comments.length > 0  ?
            <>
              <h4>Comments:</h4>
              {comments.map(comment => (
                <CommentCard key={comment._id} comment={comment}/>
              ))}
            </>
            : <h4>No comments yet</h4>
          }
        </>

      }
    </>
  );
};

export default CommentsBlock;