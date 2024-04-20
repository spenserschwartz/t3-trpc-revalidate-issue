"use client";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";

interface PageParams {
  params: {
    id: string;
  };
  revalidate: () => void;
}

const IndividualPostPage = ({ params, revalidate }: PageParams) => {
  const postId = params.id;
  const { data, isLoading, refetch } = api.post.getById.useQuery({
    id: Number(postId),
  });
  console.log(data);
  const [inputValue, setInputValue] = useState(!isLoading ? data?.name : "");

  const renamePost = api.post.rename.useMutation({
    onSettled: () => {
      //revalidate all posts (sever component)
      revalidate();
      //refetch individual post (client component)
      refetch();
    },
  });

  const handleSubmit = () => {
    if (!inputValue) return;
    renamePost.mutate({ id: Number(postId), name: inputValue });
  };

  if (isLoading) return <>Loading...</>;
  return (
    <div className="mt-16 flex flex-col items-center">
      <h1 className="text-red-600">Individual Post Page</h1>
      <h2>This is a client component</h2>

      {data && <>Post Name from useQuery: {data.name}</>}
      <input
        className="border border-black p-2 text-xl"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="New post name"
      />

      <button
        onClick={handleSubmit}
        className="border border-black bg-gray-300 p-2"
      >
        SUBMIT
      </button>

      <Link
        className="mt-8 border border-black bg-blue-300 p-2"
        href="/all-posts"
      >
        Back to /all-posts
      </Link>
    </div>
  );
};

export default IndividualPostPage;
