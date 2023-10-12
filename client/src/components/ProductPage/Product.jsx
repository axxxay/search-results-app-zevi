import {CiSearch} from 'react-icons/ci'
import * as React from 'react';
import ProductDetails from './ProductDetails';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {RxCross2} from 'react-icons/rx'
import {FiFilter} from 'react-icons/fi'
import {ProgressBar} from 'react-loader-spinner'

const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'IN PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

const ProductPage = () => {

    const [checkedRating, setCheckedRating] = useState([]);
    const [checkedPrice, setCheckedPrice] = useState([]);
    const [checkedBrand, setCheckedBrand] = useState([]);
    const [productData, setProductData] = useState([]);
    const [screenWidth, setScreenWidth] = useState(0);
    const [sideBarToggle, setSideBarToggle] = useState(true);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

    const handleSideBar = () => {
        setSideBarToggle(!sideBarToggle)
    }

    
    useEffect(() => {
        const getProductDetails = async () => {
            setApiStatus(apiStatusConstants.inProgress)
            // const apiUrl = 'http://localhost:5000/products'
            const apiUrl = 'https://api-search-results-app-zevi.onrender.com/products'
            const filterDetails = {
                rating: checkedRating,
                discountPrice: checkedPrice,
                brand: checkedBrand
            }
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filterDetails)
            }

            const response = await fetch(apiUrl, options)
            const data = await response.json()
            if(data.length === 0) {
                setApiStatus(apiStatusConstants.failure)
            } else {
                setProductData(data)
                console.log(data)
                setApiStatus(apiStatusConstants.success)
            }
           
            
        }
        getProductDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedRating, checkedPrice, checkedBrand]);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
        
      };
    
      useEffect(() => {
        setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    const filterRating = (event) => {
        let { value, checked } = event.target;
        value = parseInt(value)
        if (checked) {
            setCheckedRating([...checkedRating, value]);
        } else {
            setCheckedRating(checkedRating.filter(item => item !== value));
        }
    }

    const filterPrice = (event) => {
        let { value, checked } = event.target;
        value = parseInt(value)
        if (checked) {
            setCheckedPrice([...checkedPrice, value]);
        } else {
            setCheckedPrice(checkedPrice.filter(item => item !== value));
        }
    }

    const filterBrand = (event) => {
        let { value, checked } = event.target;
        if (checked) {
            setCheckedBrand([...checkedBrand, value]);
        } else {
            setCheckedBrand(checkedBrand.filter(item => item !== value));
        }
    }

    const renderLoader = () => (
        <div className='w-[100%] h-[100%] flex justify-center items-center '>
            <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor = '#F4442E'
                barColor = '#51E5FF'
            />
        </div>
    )

    const renderFailure = () => (
        <div className='w-[100%] h-[100%] flex justify-center items-center'>
            <p className='md:text-[40px] text-[25px] font-[600] text-black '>Empty Here...</p>
        </div>
    )

    const renderProducts = () => (
         productData.map(eachProduct => 
            (<ProductDetails key={eachProduct.id} eachProduct={eachProduct} />)
        )
    )

    const renderSections = () => {
        switch(apiStatus) {
            case apiStatusConstants.inProgress:
                return renderLoader()
            case apiStatusConstants.success:
                return renderProducts()
            case apiStatusConstants.failure:
                return renderFailure()
            default:
                return null
        }
    }

    return (
        <div className='md:px-[35px] px-[20px]  md:py-[40px] py-[30px] h-[100vh] bg-white relative'>
            <div className='flex items-center md:mb-[35px] mb-[15px] w-[100%] bg-white'>
                <div className='w-[100%] flex items-center justify-center '>
                    <input type='text' className='z-10 bg-white outline-none md:w-[40%] w-[65%] h-[45px] md:h-[57px] rounded-tl-[14px] rounded-bl-[14px] font-[400] pl-[25px]  text-[25px] border-l-[1px] border-t-[1px] border-b-[1px] border-[#00000080] border-solid ' placeholder='Search' />
                    <div className='bg-[white] h-[45px] md:h-[57px] flex justify-center items-center rounded-tr-[14px] rounded-br-[14px] border-r-[1px] border-t-[1px] border-b-[1px] border-[#00000080] border-solid'>
                        <CiSearch className='text-[27px] md:text-[35px] mr-[18px] md:mr-[30px] text-[#9f9d9d]'/>
                    </div>
                </div>
                <Link to="/">
                    <img src='/ZEVI-logo.png' className=' md:w-[75px] w-[50px] ' alt='logo' />
                </Link>
            </div>
            <h1 className='md:text-[40px] text-[25px] w-[100%] font-[400] text-black '>Search Results</h1>
            <div className={`md:flex w-[100%] h-[80%]`}>
                <div className='md:w-[25%] w-[100%]'>
                    {screenWidth < 768 ? 
                        (sideBarToggle ? 
                        <div className='flex items-center mt-2 mb-3 fixed top-[92px] right-[30px]' onClick={handleSideBar}>
                            <FiFilter className=' text-[17px] mr-[5px]' />
                            <p className='text-[15px]'>Filter</p>
                        </div>
                        : 
                        <div className='w-[100%] relative'>
                            <div className='w-[85%]'>
                                <SideBar filterBrand={filterBrand} filterPrice={filterPrice} filterRating={filterRating} />
                            </div>
                            <RxCross2 className='absolute top-[-25px] right-[8px] text-[20px]' onClick={handleSideBar}/>
                        </div>
                        )
                        : 
                        <SideBar filterBrand={filterBrand} filterPrice={filterPrice} filterRating={filterRating} />}
                </div>
                <div className='px-[5px] py-[20px] md:px-[30px] h-[80.5vh] md:h-[100%] md:w-[75%] w-[100%] overflow-y-auto flex flex-wrap'>
                    {renderSections()}
                </div>
            </div>
        </div> 
    )
}

export default ProductPage