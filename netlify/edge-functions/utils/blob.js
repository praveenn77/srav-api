import { getStore } from '@netlify/blobs';

export async function getRsvps() {
  const store = getStore();
  const blob = await store.get('rsvps');
  if (!blob) return [];
  const data = await blob.json();
  return data;
}

export async function saveRsvps(rsvps) {
  const store = getStore();
  await store.set('rsvps', JSON.stringify(rsvps));
}