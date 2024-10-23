import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { fetcher } from '@/utils/fetcher'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local',
    )
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type
  const user_id = evt.data.id
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const userPayload = {
      user_id: user_id,
      user_name: evt.data.username,
      user_image: evt.data.image_url,
    }
    if (eventType === 'user.created') {
      try {
        await fetcher('/users', 'POST', userPayload)
      } catch (e) {
        return new Response('ユーザーの作成に失敗しました。', { status: 500 })
      }
    } else if (eventType === 'user.updated') {
      try {
        await fetcher(`/users/${user_id}`, 'PATCH', userPayload)
      } catch (e) {
        return new Response('ユーザーの更新に失敗しました。', { status: 500 })
      }
    }
  } else if (eventType === 'user.deleted') {
    try {
      await fetcher(`/users/${user_id}`, 'DELETE')
    } catch (e) {
      return new Response('ユーザーの削除に失敗しました。', { status: 500 })
    }
  }

  return new Response('', { status: 200 })
}