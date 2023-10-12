import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AiFillStar} from 'react-icons/ai'
import './product.css'

const SideBar = (props) => {

    const {filterBrand, filterPrice, filterRating} = props

    const filterRatingStars = (n, rating) => {
        if(n<=rating) {
            return <AiFillStar key={n} className='text-[#FDD33D] text-[20px] mr-[5px]'/>;
        }
        return <AiFillStar key={n} className='text-[#CDCCC8] text-[20px] mr-[5px]'/>;
    }

    return (
        <div className='w-[100%]'>

            <Accordion  className='drop-down-box' >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>
                    <p className='md:text-[20px] text-[17px] text-black font-[500]'>BRAND</p>
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <div className='flex items-center mb-[10px] '>
                        <input type='checkbox' id='mango' className='w-[19px] h-[19px]' value={"Mango"} onChange={filterBrand} />
                        <label htmlFor='mango' className='text-[16px] font-[300] ml-[10px]' >Mango</label>
                    </div>
                    <div className='flex items-center '>
                        <input type='checkbox' id='hm' className='w-[19px] h-[19px]' value={"H&M"} onChange={filterBrand} />
                        <label htmlFor='hm' className='text-[16px] font-[300] ml-[10px]' >HM</label>
                    </div>
                    
                </Typography>
                </AccordionDetails>
            </Accordion> 

            <Accordion className='drop-down-box' >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>
                    <p className='md:text-[20px] text-[17px] text-black font-[500]'>PRICE RANGE</p>
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <div className='flex items-center mb-[10px] '>
                        <input type='checkbox' id='under' className='w-[19px] h-[19px]'  value={500} onChange={filterPrice} />
                        <label htmlFor='under' className='text-[16px] font-[300] ml-[10px]' >Under 500</label>
                    </div>
                    <div className='flex items-center '>
                        <input type='checkbox' id='to' className='w-[19px] h-[19px] ' value={1000} onChange={filterPrice} />
                        <label htmlFor='to' className='text-[16px] font-[300] ml-[10px]' >1000 To 3000</label>
                    </div>
                    
                </Typography>
                </AccordionDetails>
            </Accordion> 

            <Accordion className='drop-down-box' >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>
                    <p className='md:text-[20px] text-[17px] text-black font-[500]'>RATINGS</p>
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <div className='flex items-center mb-[10px] '>
                        <input type='checkbox' id='five' className='w-[19px] h-[19px]' value={5} onChange={filterRating} />
                        <label className='flex ml-[10px]' htmlFor='five' >
                            {[...Array(5)].map((_, index) => (
                                filterRatingStars(index + 1, 5)
                            ))}
                        </label>
                    </div>
                    <div className='flex items-center mb-[10px] '>
                        <input type='checkbox' id='four' className='w-[19px] h-[19px]' value={4} onChange={filterRating} />
                        <label className='flex ml-[10px]' htmlFor="four">
                            {[...Array(5)].map((_, index) => (
                                filterRatingStars(index + 1, 4)
                            ))}
                        </label>
                    </div>
                    <div className='flex items-center mb-[10px] '>
                        <input type='checkbox' id='three' className='w-[19px] h-[19px] ' value={3} onChange={filterRating}/>
                        <label className='flex ml-[10px]' htmlFor='three'>
                            {[...Array(5)].map((_, index) => (
                                filterRatingStars(index + 1, 3)
                            ))}
                        </label>
                    </div>
                    <div className='flex items-center mb-[10px] '>
                        <input type='checkbox' id='two' className='w-[19px] h-[19px] ' value={2} onChange={filterRating} />
                        <label className='flex ml-[10px]' htmlFor='two'>
                            {[...Array(5)].map((_, index) => (
                                filterRatingStars(index + 1, 2)
                            ))}
                        </label>
                    </div>
                    <div className='flex items-center mb-[10px] '>
                        <input type='checkbox' id='one' className='w-[19px] h-[19px] ' value={1} onChange={filterRating} />
                        <label className='flex ml-[10px]' htmlFor='one'>
                            {[...Array(5)].map((_, index) => (
                                filterRatingStars(index + 1, 1)
                            ))}
                        </label>
                    </div>
                </Typography>
                </AccordionDetails>
            </Accordion> 
        </div>
    )
}

export default SideBar