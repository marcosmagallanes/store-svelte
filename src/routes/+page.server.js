import { getItems } from '$lib/pocketbase';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const items = await getItems()
    return {
        items
    };
}