const communityImages = [
  "/images/community/community-01.png",
  "/images/community/community-02.png",
  "/images/community/community-03.png",
  "/images/community/community-04.png",
  "/images/community/community-05.png",
  "/images/community/community-06.png",
];

const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : null;

export function getPostImageSrc(imageUrl: string, postId: number | string) {
  if (imageUrl.startsWith("/") && !imageUrl.startsWith("//")) {
    return imageUrl;
  }

  try {
    if (supabaseOrigin && new URL(imageUrl).origin === supabaseOrigin) {
      return imageUrl;
    }
  } catch {
    // Invalid or legacy URLs use one of the project-owned community images.
  }

  const numericId = Number(postId);
  const imageIndex = Number.isSafeInteger(numericId) && numericId > 0
    ? (numericId - 1) % communityImages.length
    : Math.abs(String(postId).split("").reduce((hash, char) => hash * 31 + char.charCodeAt(0), 0)) % communityImages.length;

  return communityImages[imageIndex];
}
