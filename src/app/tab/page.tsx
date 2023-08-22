import React from 'react';
import { Metadata } from 'next';
import AppStoreWrapper from '@/components/appStoreWrapper';

export const metadata: Metadata = {
  title: 'New Tab',
  description: 'Begin your TabQuest',
}

export default function NewTab() {
  return (
    <AppStoreWrapper/>
  )
}
