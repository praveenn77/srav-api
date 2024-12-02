import { getStore } from "@netlify/edge-functions";

export async function getRsvps() {
  const store = getStore();
  const rsvps = await store.get('rsvps') || '[]';
  return JSON.parse(rsvps);
}

export async function saveRsvps(rsvps) {
  const store = getStore();
  await store.put('rsvps', JSON.stringify(rsvps));
}