import { redirect } from "next/navigation"
import { fetchUserState } from "./fetchUserState"

export async function checkLoginStatus() {
  const user = await fetchUserState()
  if(!user.isSignedIn) {
    redirect('/sign_in?status=login_required')
  }
  return user
}