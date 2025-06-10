import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // 🟩 Get a single post by slug (document ID)
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost() :: ", error);
      return false;
    }
  }

  // 🟩 Get all posts (optionally with filters)
  async getPosts(queries = [Query.equal("Status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );

    } catch (error) {
      console.log("Appwrite service :: getPosts() :: ", error);
      return false;
    }
  }

  // 🟩 Create a new post document
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          Title: title,
          Content: content,
          FeaturedImage: featuredImage,
          Status: status,
          userID: userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost() :: ", error);
      return false;
    }
  }

  // 🟩 Update an existing post document
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          Title: title,
          Content: content,
          FeaturedImage: featuredImage,
          Status: status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost() :: ", error);
      return false;
    }
  }

  // 🟥 Delete a post by slug (document ID)
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost() :: ", error);
      return false;
    }
  }

  // 📦 Upload a file to storage bucket
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile() :: ", error);
      return false;
    }
  }

  // 📦 Delete a file from storage bucket
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile() :: ", error);
      return false;
    }
  }

  // 📦 Get preview URL of a file
  getFilePreview(fileId) {
  if (!fileId) {
    console.warn("No fileId provided to getFilePreview");
    return ""; // or return a placeholder image URL if you have one
  }
  return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
}

//  Get file view method
getFileView(fileId) {
  if (!fileId) {
    console.warn("No fileId provided to getFileView");
    return ""; // or return a placeholder image URL if you have one
  }
  return this.bucket.getFileView(conf.appwriteBucketId, fileId);
}

}

// Exporting a singleton instance
const service = new Service();
export default service;
