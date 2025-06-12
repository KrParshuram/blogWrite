import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostCard({ $id, Title, FeaturedImage }) {
  const imageUrl = FeaturedImage ? appwriteService.getFileView(FeaturedImage) : '';

  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="w-full bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={Title}
            className="w-full h-44 sm:h-52 md:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="p-3 sm:p-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-200 group-hover:text-blue-500 transition-colors duration-300">
            {Title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
