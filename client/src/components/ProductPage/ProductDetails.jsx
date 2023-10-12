import { useState } from 'react'
import {AiFillStar, AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

const ProductDetails = (props) => {
    const {eachProduct} = props;
    const {productImage, productName, originalPrice, discountPrice, reviews, rating} = eachProduct;
    const [wishlist, setWishlist] = useState(false);
    const toggleWishlist = () => {
        setWishlist(!wishlist);
    }
    const [view, setView] = useState(false)
    const viewProduct = () => {
        setView(true);
    }
    const removeProduct = () => {
        setView(false);
    }

    const ratingStars = (n) => {
        if(n<=rating) {
            return <AiFillStar key={n} className='text-[#FDD33D] text-[19px] mr-[4px]'/>
        }
        return <AiFillStar key={n} className='text-[#CDCCC8] text-[19px] mr-[4px]'/>
    }

    return(
        <div className=' w-[47%] mr-[3%] mb-[5%] md:w-[30%] md:mr-[3%] md:mb-[5%] lg:w-[22%] lg:mr-[3%] lg:mb-[5%] flex flex-col justify-between ' onMouseOver={viewProduct} onMouseOut={removeProduct}>

            <div className='relative'>
                <img src={productImage} className='w-[100%] rounded-t-[4px]' alt='' />

                {wishlist ? <AiFillHeart onClick={toggleWishlist} className='text-[#D32424] text-[18px] md:text-[23px] absolute top-[6%] right-[6%]'/> :
                <AiOutlineHeart onClick={toggleWishlist} className='text-[#ffffff] text-[18px] md:text-[23px] absolute top-[6%] right-[6%]' /> }
                {view && 
                    <button type='button' className='bg-[#6D84FF71] text-white h-[35px] md:h-[47px] w-[100%] text-[13px] md:text-[20px] font-[500] absolute bottom-[0%]'>View Product</button> 
                }
            </div>
            <p className='text-[13px] md:text-[17px] font-[400] mt-[15px] '>{productName.length<19 ? productName : productName.slice(0,19)+"..."}</p>
            <div className='flex mt-[8px]'>
                <p className='text-[15px] md:text-[18px] lg:text-[18px] font-[400] mr-[7px] text-[#00000050] line-through '>Rs. {originalPrice}</p>
                <p className='text-[15px] md:text-[18px] lg:text-[18px] font-[600] text-[#6D84FF] '>Rs.{discountPrice}</p>
            </div>
            <div className='flex items-center mt-[8px]' >
                {[...Array(5)].map((_, index) => (
                    ratingStars(index + 1)
                ))}
                <p className='text-[12px] md:text-[16px] text-[#00000095] font-[400]'>({reviews})</p>
            </div>
        </div>
    )
}

export default ProductDetails