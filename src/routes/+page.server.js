import { pb } from '$lib/pocketbase';

export async function load() {

    const items = await pb.collection('items').getFullList({
        sort: '-created', query: { expand: 'categoryID' }
    });
    return { items }
}
