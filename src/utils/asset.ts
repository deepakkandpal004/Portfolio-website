// Resolves a public asset path against Vite's configured base URL.
// Works on root deployments (base "/") and subpath deployments
// like GitHub Pages (base "/Portfolio-website/").
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
