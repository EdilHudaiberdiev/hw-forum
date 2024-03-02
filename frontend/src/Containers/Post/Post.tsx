import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {useEffect} from 'react';
import {getPosts} from '../../Features/posts/PostsThunk';
import Spinner from '../../Components/UI/Spinner/Spinner';
import PostCard from '../../Components/PostCard/PostCard';

const Post = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.isLoading);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="container">
      {loading ? <Spinner/> :
        <>
          {posts.length === 0 ? <p>No posts yet</p> :
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                {posts.map(post => (
                  <div key={post._id} className="post-container mb-2">
                    <PostCard post={post}/>
                  </div>
                ))}
              </div>
            </div>
          }
        </>
      }
    </div>
  );
};

export default Post;