import type { Post } from "../mocks/posts";
import { supabase } from "./supabase";

type PostRow = Post & { user_id?: string };

export async function fetchPosts(options: {
  orderBy: "created_at" | "likes";
  ascending: boolean;
  minimumLikes?: number;
  limit?: number;
}) {
  let query = supabase.from("posts").select("*");

  if (options.minimumLikes !== undefined) {
    query = query.gte("likes", options.minimumLikes);
  }

  query = query.order(options.orderBy, { ascending: options.ascending });

  if (options.limit !== undefined) {
    query = query.range(0, options.limit - 1);
  }

  const { data: rows, error } = await query;

  if (error) {
    console.error("No se pudieron cargar las publicaciones:", error.message);
    return [] as Post[];
  }

  const posts = (rows ?? []) as PostRow[];
  const userIds = [...new Set(posts.map((post) => post.user_id).filter((id): id is string => Boolean(id)))];
  const profilesById = new Map<string, { username: string; avatar_url: string | null }>();

  if (userIds.length > 0) {
    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .in("id", userIds);

    if (profileError) {
      console.error("No se pudieron cargar los perfiles:", profileError.message);
    } else {
      for (const profile of profiles ?? []) {
        profilesById.set(profile.id, profile);
      }
    }
  }

  return posts.map((post) => {
    const profile = post.user_id ? profilesById.get(post.user_id) : undefined;

    return {
      ...post,
      user: profile
        ? { username: profile.username, avatar: profile.avatar_url }
        : null,
      isLiked: Boolean(post.isLiked),
    } as Post;
  });
}
