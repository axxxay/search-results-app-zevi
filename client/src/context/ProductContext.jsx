import { createContext } from "react"
import { faker } from '@faker-js/faker';

const ProductContext = createContext();

const ProductProvider = ({children}) => {
    let suggestionsData = []
    
    for (let i = 0; i < 5; i++) {
       
        const productImage = faker.image.urlPicsumPhotos({ width: 130, height: 175, category: 'fashion' }) 
        const productName = faker.commerce.productName();
        const data = {
            productImage,
            productName,
        }
        suggestionsData.push(data);
    }

    return (
        <ProductContext.Provider value={{suggestionsData}}>
            {children}
        </ProductContext.Provider>
    )
}

export {ProductProvider, ProductContext}