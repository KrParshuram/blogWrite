// Imports remain unchanged
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import appwriteSerice from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      status: "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        slug: post.slug || "",
        content: post.content || "",
        status: post.status || "active",
      });

      setTimeout(() => {
        setValue("content", post.content || "");
      }, 0);
    }
  }, [post, reset, setValue]);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
  }, []);

  useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    setIsSubmitting(true);
    setError("");
    try {
      if (post) {
        const file = data.image?.[0]
          ? await appwriteSerice.uploadFile(data.image[0])
          : null;

        if (file && post.featuredImage) {
          await appwriteSerice.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteSerice.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = data.image?.[0]
          ? await appwriteSerice.uploadFile(data.image[0])
          : null;

        if (file) {
          data.featuredImage = file.$id;
        }

        const dbPost = await appwriteSerice.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("There was an error processing your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {/* Header */}
  <div className="col-span-full text-center pb-4">
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
      {post ? "Edit Your Post" : "Create New Post"}
    </h2>
    <p className="text-sm text-gray-500">
      {post ? "Make updates and save changes" : "Start sharing your thoughts"}
    </p>
  </div>

  {/* Left Column (Main Fields) */}
  <div className="col-span-2 space-y-6">
    <Input
      label="Title"
      placeholder="Post title"
      {...register("title", { required: true })}
    />

    <Input
      label="Slug"
      placeholder="your-post-slug"
      {...register("slug", { required: true })}
      onChange={(e) =>
        setValue("slug", slugTransform(e.target.value), { shouldValidate: true })
      }
    />

    <RTE label="Content" name="content" control={control} />
  </div>

  {/* Right Column (Meta Fields) */}
  <div className="space-y-6">
    <div>
      <Input
        label="Featured Image"
        type="file"
        accept="image/png, image/jpeg"
        {...register("image", { required: !post })}
      />
      {post?.featuredImage && (
        <div className="mt-2 border rounded overflow-hidden">
          <img
            src={appwriteSerice.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full h-40 object-cover"
          />
        </div>
      )}
    </div>

    <Select
      options={["active", "inactive"]}
      label="Status"
      {...register("status", { required: true })}
    />

    <Button
      type="submit"
      className="w-full bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-200"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting..." : post ? "Update Post" : "Publish Post"}
    </Button>

    {error && (
      <p className="text-sm text-red-500 text-center">{error}</p>
    )}
  </div>
</form>

  );
}
