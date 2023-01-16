import {CATEGORIES, TUser} from "./types"
import {TProduct} from "./types"
import {TPurchase} from "./types"

export const users: TUser[] = [
    {
        id: "1",
        email:"gustavo@gustavo.com" ,
        password: "123456"
    },
    {
        id: "2",
        email:"ryzia@ryzia.com" ,
        password: "78910"
    }
]

export const products: TProduct[] = [
    {
        id: '1',
        name: 'blusa',
        price: 25,
        category: CATEGORIES.CLOTHES_AND_SHOES
    },
    {
        id: '2',
        name: 'óculos',
        price: 30,
        category: CATEGORIES.ACCESSORIES
    }
]

export const purchases: TPurchase[] = [
    {
        userId: '1',
        productId : '1',
        quantity : 2,
        totalPrice  : 50
    },
    {
        userId: '2',
        productId : '2',
        quantity : 2,
        totalPrice  : 60
    }
]

export function createUser(id: string, email: string, password: string):string{
    users.push({
        id,
        email,
        password
    })
    return("cadastro realizado com sucesso")
}

export function getAllUsers(): TUser[]{
    return users;
}

export function createProduct(id: string, name: string, price: number, category: CATEGORIES): string{
    products.push({
        id, 
        name, 
        price, 
        category
    })
    return("produto criado com sucesso")
}

export function getAllProducts(): TProduct[]{
    return products;
}

export function getProductById (id: string): TProduct[]{
    return products.filter((product)=>{
        return product.id == id
    });
}


export function queryProductsByName(q : string) : TProduct[]{
    return products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
}

export function createPurchase(userId : string, productId : string, quantity : number, totalPrice : number) : string{
    purchases.push({
        userId,
        productId,
        quantity,
        totalPrice    
    })
    return ("Compra realizada com sucesso");
}

export function getAllPurchasesFromUserId(userIdToSearch : string) : TPurchase[]{
    return purchases.filter(purchase => purchase.userId === userIdToSearch);
}