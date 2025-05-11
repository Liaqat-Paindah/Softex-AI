'use client';

import React, { useActionState, useState } from 'react';
import { CreatePost } from '../../components/actions/post';
import { UploadButton } from '../../utils/uploadthing'; // Adjust the path if needed
import '@uploadthing/react/styles.css'; // Ensure styles are loaded
import { CloudUpload } from 'lucide-react'; // or any icon library




function Create() {
  const [state, createPost, isPending] = useActionState(CreatePost, undefined);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  return (
    <div className="pt-[3%] flex items-center justify-center bg-[#0a0f1a] px-4">
      <div className="w-full max-w-md bg-[#121826] rounded-[8px] p-8 shadow-2xl text-white">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-100">
          Create Post
        </h2>

        <form action={createPost} className="text-sm space-y-4">
          {/* Title Field */}
          <div>
            <label className="text-gray-400 block font-medium mb-1">Title</label>
            <input
              type="text"
              name="Title"
              defaultValue={state?.Title}
              className="bg-[#1f2937] border border-[#2e3a4e] text-white rounded px-2 py-2 w-full focus:outline-none focus:ring-1"
            />
            {state?.errors?.Title && (
              <ul className="mt-1 text-red-500 list-disc list-inside">
                {state.errors.Title.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Date Field */}
          <div>
            <label className="text-gray-400 block font-medium mb-1">Date</label>
            <input
              type="date"
              name="Date"
              defaultValue={state?.Date}
              className="bg-[#1f2937] border border-[#2e3a4e] text-white rounded px-2 py-2 w-full focus:outline-none focus:ring-1"
            />
            {state?.errors?.Date && (
              <ul className="mt-1 text-red-500 list-disc list-inside">
                {state.errors.Date.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
          </div>

          {/* UploadThing Image Upload */}
          <div>
            <label className="text-gray-400 block font-medium mb-1">Photo</label>

            <div className="bg-[#1f2937] border-2 border border-[#2e3a4e] rounded p-6 text-center relative">
              
              {/* Conditionally show icon & helper text */}
              {!uploadedImage && (
                <>
                  <CloudUpload className="mx-auto text-gray-500 w-8 h-8 mb-2" />
                  <p className="text-sm text-gray-400 mb-2">
                    Drag & drop or click to upload (Max 4MB)
                  </p>
                </>
              )}

              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // This is correct: getting the uploaded URL
                  const url = res?.[0]?.url;
                  if (url) {
                    setUploadedImage(url); // Just for displaying the image
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`Upload failed: ${error.message}`);
                }}
              />


              {/* Show preview if uploaded */}
              {uploadedImage && (
                <>
                  <input type="hidden" name="Photo" value={uploadedImage} />
                  <div className="mt-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded Preview"
                      className="rounded border border-gray-600 w-full max-h-40 object-contain"
                    />
                    <p className="text-green-400 text-xs mt-1">Image uploaded successfully</p>
                  </div>
                </>
              )}
            </div>

            {/* Show any validation errors */}
            {state?.errors?.Photo && (
              <ul className="mt-1 text-red-500 list-disc list-inside">
                {state.errors.Photo.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="text-gray-400 block font-medium mb-1">Description</label>
            <textarea
              name="Description"
              defaultValue={state?.Description}
              className="bg-[#1f2937] border border-[#2e3a4e] text-white rounded px-2 py-2 w-full focus:outline-none focus:ring-1"
              rows={4}
            ></textarea>
            {state?.errors?.Description && (
              <ul className="mt-1 text-red-500 list-disc list-inside">
                {state.errors.Description.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2 text-white bg-cyan-600 rounded hover:bg-cyan-700 transition-colors"
            >
              {isPending ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
