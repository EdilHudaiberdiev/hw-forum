import {Button} from '@mui/material';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {AppDispatch, RootState} from '../../app/store';
import AddCommentForm from '../../Components/AddCommentForm/AddCommentForm';
import CommentsBlock from '../../Components/CommentsBlock/CommentsBlock';
import FullPostCard from '../../Components/FullPostCard/FullPostCard';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {getComments} from '../../Features/comments/CommentsThunk';
import {getPostsById} from '../../Features/posts/PostsThunk';

const FullPost = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigate();
  const params = useParams();
  const post = useSelector((state: RootState) => state.posts.post);
  const postLoading = useSelector((state: RootState) => state.posts?.isLoading);

  useEffect(() => {
    if (params.id) {
      dispatch(getPostsById(params.id));
      dispatch(getComments(params.id));
    }

  }, [dispatch, params.id]);

  return (
    <div className="container">
      <Button onClick={() => navigation('/')}>Go back</Button>


      {postLoading ? <Spinner/> : <FullPostCard post={post}/>}

      <hr/>
      <AddCommentForm post_id={params.id}/>
      <hr/>

      <CommentsBlock/>
    </div>
  );
};

export default FullPost;