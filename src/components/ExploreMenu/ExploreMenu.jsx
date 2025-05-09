import React, { useRef } from 'react'
import { images } from '../../assets/images'
import './exploremenu.css'

const ExploreMenu = ({category,setCategory}) => {
    const menuRef=useRef(null);
    const scrollLeft=()=>{
        if(menuRef.current){
            menuRef.current.scrollBy({left:-200,behavior:'smooth'});
        }
    }

    const scrollRight=()=>{
        if(menuRef.current){
            menuRef.current.scrollBy({left:200,behavior:'smooth'});
        }
    }
  return (
    <div className='explore-menu postion-relative'>
        <h1 className="d-flex align-item-center justify-content-between">Explore Our Menu
        <div className="d-flex">
            <i onClick={scrollLeft} className="bi bi-arrow-left-circle scroll-icon"></i>
            <i onClick={scrollRight} className="bi bi-arrow-right-circle scroll-icon"></i>
        </div>
        </h1>
        <p>Explore curated lists of dishes from top categories</p>
        <div className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list" ref={menuRef}>
            {
                images.map((item,index)=>{
                    return(
                        <div key={index}>
                            <div className="text-center explore-menu-list-item" onClick={()=>setCategory(prev=>prev===item.role?'All':item.role)} >
                            <img src={item.url} className={item.role===category?'rounded-circle active': 'rounded-circle'} height={128} width={128} alt="" />
                            <p className='m-2 fw-bold'>{}</p>
                        </div>
                        </div>
                    )
                })
            }

        </div>
        <hr />
        
    </div>
  )
}

export default ExploreMenu