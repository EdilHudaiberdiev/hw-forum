import React from 'react';
import {NavLink} from 'react-router-dom';
import {IPosts} from '../../types';
import dayjs from 'dayjs';
import {CardMedia, styled} from '@mui/material';
import NoPostImage from '../../assets/news-img.jpg';
import {apiUrl} from '../../constants';

const ImageCardMedia = styled(CardMedia)({
  width: '120px',
  height: "50px",
  borderRadius: "50%",
});

interface Props {
  post: IPosts;
}

const PostCard: React.FC<Props> = ({post}) => {
  return (
    <NavLink to={`/posts/${post._id}`} className="w-100 text-decoration-none text-black">
      <div className="col  pt-2">
        <div className="post-card text-start p-2">
          <p className="text-center">{dayjs(post.datetime).format('ddd, MMM D, YYYY h:mm A')}</p>
          <div className="d-flex justify-content-between">
            <div>
              <ImageCardMedia
                image={post.image ? apiUrl + post.image : NoPostImage} title={post._id}/>
            </div>
            <div className="w-50">
              <h4 className="mb-3">{post.title}</h4>
              <p className="mb-1">{post.user.user}</p>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default PostCard;