'use server';

import { cookies } from 'next/headers';
import { apiBaseUrl } from '@/constants/apiBaseUrl';

export async function fetchUserAction() {
  const accessToken = cookies().get('access-token')?.value;
  const client = cookies().get('client')?.value;
  const uid = cookies().get('uid')?.value;

  if (!accessToken || !client || !uid) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(CODESPAN_PLACEHOLDER_1, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to validate token');
  }

  return res.json();
}