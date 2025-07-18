import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name = 'content', control, label }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-[#0F172A] dark:text-white">
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
              height: 420,
              menubar: false,
              plugins: [
                'preview', 'anchor', 'autolink', 'autosave', 'code', 'fullscreen',
                'image', 'link', 'lists', 'media', 'searchreplace', 'table',
                'visualblocks', 'wordcount', 'emoticons'
              ],
              toolbar:
                'undo redo | bold italic underline | bullist numlist | link image media | alignleft aligncenter alignright | code preview fullscreen',
              skin: 'oxide',
              content_css: 'default',
              content_style: `
                :root {
                  color-scheme: light dark;
                }
                body {
                  font-family: Inter, system-ui, sans-serif;
                  font-size: 16px;
                  line-height: 1.75;
                  padding: 1.5rem;
                  color: #1e293b;
                  background-color: #ffffff;
                  max-width: 700px;
                  margin: auto;
                }

                h1, h2, h3, h4 {
                  font-weight: 600;
                  color: #0f172a;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                }

                p {
                  margin: 1rem 0;
                }

                a {
                  color: #0284c7;
                  text-decoration: underline;
                }

                ul, ol {
                  margin-left: 2rem;
                  padding-left: 1rem;
                }

                code, pre {
                  background-color: #f1f5f9;
                  color: #0f172a;
                  padding: 0.3rem 0.5rem;
                  border-radius: 0.25rem;
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 14px;
                }

                blockquote {
                  border-left: 4px solid #94a3b8;
                  padding-left: 1rem;
                  color: #475569;
                  margin: 1rem 0;
                  font-style: italic;
                }
              `,
              branding: false,
              statusbar: false,
              resize: false,
            }}
          />
        )}
      />
    </div>
  );
}
