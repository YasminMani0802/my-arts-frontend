export interface Product {
    name: string,
    description?: string,
    price: string,
    user_id: string,
    artistName: string,
    imagePath: string,
    _id: string,
    isFavourite?: boolean,
    isInShoppingCart?: boolean,
    userImage: string
}