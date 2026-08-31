export function formatProjectTitle(slug: string) {
  if (slug === "music-player") {
    return "Music Player";
  }

  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getProjectImageUrl(slug: string) {
  if (slug === "portfolio-nexus") {
    return "/projects/ecosystem/textures/site_card.webp";
  }

  return `/projects/${slug}/textures/card_home.webp`;
}

export function getProjectDescription(formattedTitle: string) {
  return `Explore the ${formattedTitle} case study in my portfolio: a high-quality digital experience focused on performance and craft.`;
}
