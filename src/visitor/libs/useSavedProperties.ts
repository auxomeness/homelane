import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'homelane-visitor-saved-properties';

function readSavedIds(): number[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is number => Number.isInteger(id)) : [];
  } catch {
    return [];
  }
}

export function useSavedProperties() {
  const [savedIds, setSavedIds] = useState<number[]>(readSavedIds);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // Saved homes still work for the current page if browser storage is unavailable.
    }
  }, [savedIds]);

  const toggleSaved = useCallback((propertyId: number) => {
    setSavedIds((current) => current.includes(propertyId)
      ? current.filter((id) => id !== propertyId)
      : [...current, propertyId]);
  }, []);

  return { savedIds, toggleSaved };
}
