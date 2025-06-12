import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name = "content", control, label }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="df0kat8pdc8cg61b319wdkkikjweny7f8sp3pfd1os2inlo7"
            value={value}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: false,
              resize: true,
              plugins: [
                "preview", "anchor", "autolink", "autosave", "code", "fullscreen",
                "image", "link", "lists", "media", "searchreplace", "table", "visualblocks",
                "wordcount", "emoticons", "help"
              ],
              toolbar:
                "undo redo | blocks | bold italic underline strikethrough | bullist numlist | link image media | alignleft aligncenter alignright alignjustify | removeformat | code fullscreen preview",
              skin: "oxide",
              content_css: "default",
              content_style: `
                body {
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 14px;
                  color: #111827;
                  background-color: transparent;
                  line-height: 1.6;
                  padding: 1rem;
                }
                h1, h2, h3, h4 {
                  color: #111827;
                  margin-top: 1rem;
                }
                ul, ol {
                  padding-left: 1.2rem;
                }
                pre, code {
                  background-color: #f3f4f6;
                  color: #111827;
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.25rem;
                }
              `,
              branding: false,
              statusbar: false,
            }}
          />
        )}
      />
    </div>
  );
}
