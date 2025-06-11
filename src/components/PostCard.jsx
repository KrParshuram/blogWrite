import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostCard({ $id, Title, FeaturedImage }) {
  const imageUrl = FeaturedImage ? appwriteService.getFileView(FeaturedImage) : '';

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={Title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 flex justify-center"
          />
        )}
        <div className="p-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-200 group-hover:text-blue-600 transition-colors duration-300">
            {Title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
