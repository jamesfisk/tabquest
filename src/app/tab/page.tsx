import React from 'react';
import Slab from '@/components/slab';
import { Metadata } from 'next';
import Quiz from '@/components/quiz';

export const metadata: Metadata = {
  title: 'New Tab',
  description: 'Begin your TabQuest',
}

export default function NewTab() {
  return (
    <Slab>
      <Quiz/>
    </Slab>
  )
}
