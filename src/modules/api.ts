import { BACKEND_URL } from "../config";

export async function fetchValidators() {
  const res = await fetch(`${BACKEND_URL}/validators`);
  return res.json();
}