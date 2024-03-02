import dayjs from 'dayjs';
import React from 'react';
import NoPostImage from '../../assets/news-img.jpg';
import {apiUrl} from '../../constants';
import {IPosts} from '../../types';

interface Props {
  post: IPosts | null;
}
const FullPostCard: React.FC<Props> = ({post}) => {
  return (
    <>
      {post !== null ?
        <div className="text-start p-2 border p-3 w-50 mx-auto">
          <p className="text-center">{dayjs(post.datetime).format('ddd, MMM D, YYYY h:mm A')}</p>
          <div className="d-flex justify-content-between">
            <div>
              <img width="200" src={post.image ? apiUrl + post.image : NoPostImage} alt={post._id}/>
            </div>
            <div className="w-50">
              <h4 className="mb-3">{post.title}</h4>
              <p>Author: {post.user.user}</p>
              <p className="mb-1">{post.description}</p>
            </div>
          </div>
        </div>
        : <h2>Not found</h2>
      }
    </>
  );
};

export default FullPostCard;