import React from 'react';
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
    <div className="col w-100 pt-2">
      <div className="post-card text-start p-2">
        <h4 className="mb-3">{post.title}</h4>
        <p className="mb-1">{post.user}</p>
        <p className="mb-2">{post.description}</p>
        <p className="text-center">{dayjs(post.datetime).format('ddd, MMM D, YYYY h:mm A')}</p>
        <ImageCardMedia
          image={post.image ? apiUrl + post.image : NoPostImage} title={post._id}/>
      </div>
    </div>
  );
};

export default PostCard;