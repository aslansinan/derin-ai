'use client';

import dynamic from 'next/dynamic';

const NextAi = dynamic(() => import('./NextAi'), {
  loading: () => <div>Yükleniyor...</div>,
  ssr: false, // SSR sırasında hatayı önler
});

export default function Page() {
  return <NextAi />;
}
