import React from "react";
import { useForm } from "react-hook-form";
import TRTE from "./testRTE";

export default function TestForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: { content: "" }
  });

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TRTE control={control} name="content" label="Content:" />
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Submit
      </button>
    </form>
  );
}

