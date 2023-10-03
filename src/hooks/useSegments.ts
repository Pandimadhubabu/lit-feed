import { usePath } from "./usePath";

export function useSegments() {
  const path = usePath();
  const segments = path.split("/").filter(Boolean);
  return segments;
}
