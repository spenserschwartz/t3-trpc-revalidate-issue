import Link from "next/link";
import { api } from "~/trpc/server";

const AllPostsPage = async () => {
  const allPosts = await api.post.getAll();

  return (
    <div className="mt-16 flex flex-col items-center">
      <h1 className="text-2xl text-red-600">
        All Posts Page (Sever Component)
      </h1>
      <h2>Click on post to visit their dynamic page and rename</h2>
      {allPosts.map((post) => (
        <Link
          href={`/post/${post.id}`}
          className="m-4 border border-black p-4"
          key={post.id}
        >
          {post.name}
        </Link>
      ))}
    </div>
  );
};

export default AllPostsPage;
