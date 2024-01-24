import PocketBase from 'pocketbase'

export const pb = new PocketBase("https://store-pocketbase.fly.dev")

export const getItems = async () => {

    const items = await pb.collection('items').getFullList({
        sort: '-created', query: { expand: 'categoryID' }
    });
    return items
}

export const login = async (form: HTMLFormElement) => {
    try {
        console.log(form)
    } catch (err) {
        console.error(err);
    }
}

export const signup = async (form: HTMLFormElement) => {
    try {
        console.log(form)
    } catch (err) {
        console.error(err);
    }
}
