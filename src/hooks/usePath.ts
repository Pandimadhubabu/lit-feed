export function usePath() {
  if (typeof document === "undefined") return "/";
  return document.location.pathname;
}
