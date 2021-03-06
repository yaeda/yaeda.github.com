import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parseISO } from "date-fns";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    if (
      typeof matterResult.data.date === "object" &&
      typeof matterResult.data.date.toISOString === "function"
    ) {
      matterResult.data.date = matterResult.data.date.toISOString();
    }

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (parseISO(a.date) < parseISO(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  if (
    typeof matterResult.data.date === "object" &&
    typeof matterResult.data.date.toISOString === "function"
  ) {
    matterResult.data.date = matterResult.data.date.toISOString();
  }
  const content = matterResult.content;

  // Combine the data with the id and content
  return {
    id,
    content,
    ...(matterResult.data as { date: string; title: string }),
  };
}
