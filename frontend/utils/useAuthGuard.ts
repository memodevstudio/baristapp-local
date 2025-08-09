// frontend/utils/useAuthGuard.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function useAuthGuard() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token || !user) {
      router.replace('/login');
      return;
    }
    setIsReady(true);
  }, [router]);

  return isReady;
}
