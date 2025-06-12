import React, { useCallback, useEffect } from "react";
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
    getValues,
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

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteSerice.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteSerice.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteSerice.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteSerice.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await appwriteSerice.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
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

  return (
<form
  onSubmit={handleSubmit(submit)}
  className="grid grid-cols-1 md:grid-cols-3 gap-6"
>
  {/* Header */}
  <div className="col-span-full px-2">
    <h2 className="text-2xl font-semibold tracking-wide text-center text-white bg-gradient-to-r from-gray-900 via-blue-900 to-black p-4 rounded-lg shadow-lg">
      {post ? "Update Your Blog Post" : "Create a New Blog Post"}
    </h2>
  </div>

  {/* Left Column (Title, Slug, Content) */}
  <div className="col-span-2 px-2 space-y-4">
    <Input
      label="Title"
      placeholder="Title"
      {...register("title", { required: true })}
    />
    <Input
      label="Slug"
      placeholder="Slug"
      {...register("slug", { required: true })}
      onInput={(e) => {
        setValue("slug", slugTransform(e.currentTarget.value), {
          shouldValidate: true,
        });
      }}
    />
    <RTE label="Content" name="content" control={control} />
  </div>

  {/* Right Column (Image, Status, Button) */}
  <div className="col-span-1 px-2 space-y-4">
    <Input
      label="Featured Image"
      type="file"
      accept="image/png, image/jpg, image/jpeg"
      {...register("image", { required: !post })}
    />

    {/* {post && (
      <div className="w-full">
        <img
          src={appwriteSerice.getFileView(post.featuredImage)}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
      </div>
    )} */}

    <Select
      options={["active", "inactive"]}
      label="Status"
      {...register("status", { required: true })}
    />

    <Button
      type="submit"
      bgColor={post ? "bg-green-500" : undefined}
      className="w-full"
    >
      {post ? "Update" : "Submit"}
    </Button>
  </div>
</form>

  );
}
