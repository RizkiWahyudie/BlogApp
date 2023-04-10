/* eslint-disable react/no-children-prop */

import React from "react";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import usePostDetail from "../../hooks/usePostDetail";
import { useRouter } from "next/router";

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/delete/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Post: React.FC<PostProps> = () => {
  const { data: session, status } = useSession();
  const route = useRouter();
  const query: any = route.query.id;
  const { data } = usePostDetail(query);
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === data?.author?.email;
  let title = data?.title;
  if (!data?.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {data?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={data?.content} />
        {!data?.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(data?.id)}>Publish</button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => deletePost(data?.id)}>Delete</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
