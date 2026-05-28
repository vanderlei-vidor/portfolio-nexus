export function formatProjectTitle(slug: string) {
  if (slug === "project-one") {
    return "Music Player";
  }

  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getProjectImageUrl(slug: string) {
  return `/textures/${slug}.jpg`;
}

export function getProjectDescription(formattedTitle: string) {
  return `Explore o case de sucesso do projeto ${formattedTitle} no meu portfolio. Uma experiencia digital de alta qualidade e performance.`;
}
