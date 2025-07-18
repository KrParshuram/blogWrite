import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostCard({ $id, Title, FeaturedImage }) {
  const imageUrl = FeaturedImage ? appwriteService.getFileView(FeaturedImage) : '';

  return (
    <Link to={`/post/${$id}`} className="block group w-full">
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={Title}
            className="w-full md:w-1/3 h-48 object-cover rounded-md"
          />
        )}
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200">
            {Title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
