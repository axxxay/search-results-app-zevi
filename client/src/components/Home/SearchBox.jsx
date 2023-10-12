import {CiSearch} from 'react-icons/ci'
import './home.css'
import { ProductContext } from '../../context/ProductContext';
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom';

const SearchBox = () => {
    const [openSuggestions, setOpenSuggestions] = useState(false)
    const {suggestionsData} = useContext(ProductContext)
    
    return(
        <div className="home-bg-con min-h-[100vh] flex flex-col items-center p-[30px] relative ">
            <img src='/ZEVI-logo.png' className='md:self-end self-center ml-[20px] md:ml-[none] w-[75px] ' alt='logo' />
            <div className='w-[100%] md:w-[55%] flex items-center justify-center md:mt-[70px] mt-[40px] mb-[10px]'>
                <input type='text' className='z-10 outline-none w-[100%] bg-[white] h-[60px] rounded-tl-[18px] rounded-bl-[18px] font-[400] pl-[25px] text-[25px] ' onClick={() => setOpenSuggestions(true)} placeholder='Search' />
                <Link to="/search-results">
                    <div className='bg-[white] h-[60px] flex justify-center items-center rounded-tr-[18px] rounded-br-[18px]'>
                        <CiSearch className='text-[35px] mr-[30px] text-[#9f9d9d]'/>
                    </div>
                </Link>
            </div>
            {openSuggestions && 
            <div className='search-suggestions-modal '>
                <div className='search-suggestions-overlay' onClick={() => setOpenSuggestions(false)}></div>
                <div className='search-suggestions-modal-content rounded-[4px] py-[20px] px-[25px]'>
                    <h1 className='text-[20px] font-[500] mb-[20px] '>Latest Trends</h1>
                    <div className='grid grid-cols-5 md:gap-[17px] gap-[5px]'>
                        {suggestionsData.map(eachSuggestion => 
                            <div className=''>
                                <Link to="/search-results">
                                    <img src={eachSuggestion.productImage} className='w-[130px] mb-[7px] rounded-[4px]' alt='' />
                                    <p className='text-[11px] font-[300] leading-[17px] xs:text-[13px] '>{eachSuggestion.productName}</p>
                                </Link>
                            </div>
                        )}
                    </div>
                    <h1 className='text-[20px] font-[500] mb-[20px] mt-[25px]'>Popular suggestions</h1>
                    <p className='text-[16px] font-[400] mb-[5px]'>Striped shirt dress</p>
                    <p className='text-[16px] font-[400] mb-[5px]'>Satin shirt</p>
                    <p className='text-[16px] font-[400] mb-[5px]'>Denim jumpsuit</p>
                    <p className='text-[16px] font-[400] mb-[5px]'>Leather dresses</p>
                    <p className='text-[16px] font-[400] mb-[5px]'>Solid tshirts</p>
                </div>
            </div>
            }
        </div>
    )
}

export default SearchBox