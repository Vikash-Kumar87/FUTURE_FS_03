function readQueue(key) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeQueue(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function getQueuedItems(key) {
  return readQueue(key);
}

export function enqueueItem(key, payload) {
  const items = readQueue(key);
  const next = [...items, { ...payload, queuedAt: new Date().toISOString() }];
  writeQueue(key, next);
  return next.length;
}

export function removeQueuedItemAt(key, index) {
  const items = readQueue(key);
  if (index < 0 || index >= items.length) {
    return items.length;
  }

  const next = items.filter((_, i) => i !== index);
  writeQueue(key, next);
  return next.length;
}

export function clearQueuedItems(key) {
  writeQueue(key, []);
}
