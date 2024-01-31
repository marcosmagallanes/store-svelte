import { redirect } from '@sveltejs/kit'

export const POST = ({ locals }) => {
    console.log("logout")
    locals.pb.authStore.clear()
    locals.user = undefined

    throw redirect(303, '/')
}