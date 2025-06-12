import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name = "content", control, label }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}

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
              plugins: [
                "preview", "anchor", "autolink", "autosave", "code", "fullscreen",
                "image", "link", "lists", "media", "searchreplace", "table", "visualblocks",
                "wordcount", "emoticons", "help"
              ],
              toolbar:
                "undo redo | blocks | bold italic underline strikethrough | bullist numlist | link image media | alignleft aligncenter alignright alignjustify | removeformat | code fullscreen preview",
              skin: window.matchMedia('(prefers-color-scheme: dark)').matches ? "oxide-dark" : "oxide",
              content_css: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "default",
              content_style: `
                body {
                  font-family:Helvetica,Arial,sans-serif;
                  font-size:14px;
                  background-color: transparent;
                  color:'#000b24';
                }
              `,
              branding: false,
              statusbar: false,
              resize: true,
            }}
          />
        )}
      />
    </div>
  )
}
