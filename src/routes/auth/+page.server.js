import { fail, error, redirect } from '@sveltejs/kit'

export const actions = {
    signup: async ({ locals, request }) => {
        console.log("Sign up")

        const form = Object.fromEntries(await request.formData())

        try {
            await locals.pb.collection('users').create({ ...form })
        } catch (err) {
            console.log("Error: ", err)
            throw error(500, "Something went terribly wrong...")
        }

        throw redirect(303, '/auth')
    },
    login: async ({ locals, request }) => {
        console.log("Login")
        const form = Object.fromEntries(await request.formData())

        try {
            await locals.pb.collection('users').authWithPassword(String(form.email), String(form.password))

            // if (!locals.pb?.authStore?.model?.verified) {
            //     locals.pb.authStore.clear()
            //     return {
            //         notVerified: true
            //     }
            // }

        } catch (err) {
            console.log("Error: ", err)
            throw error(500, "Something went terribly wrong...")
        }

        throw redirect(303, '/account')
    },
    reset: async ({ request, locals }) => {
        console.log("Reset")

        const form = Object.fromEntries(await request.formData())

        try {
            await locals.pb.collection('users').requestPasswordReset(String(form.email))
            return { success: true }
        } catch (err) {
            console.log("Error: ", err)
            throw error(500, "Something went terribly wrong...")
        }
    }
};
