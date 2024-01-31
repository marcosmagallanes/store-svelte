import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {

    if (!locals.pb.authStore.isValid) {
        return redirect(302, '/auth');
    }

    const orders = await locals.pb.collection('orders').getFullList({
        sort: '-created',
        expand: 'orderItems'
    });
    return {
        orders,
        user: locals.user
    }
}
