import React, { useEffect } from 'react'
import { CgMenuRightAlt } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import {NavLink} from "react-router-dom";
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';


const Navbar = () => {

 const [open, setOpen] = React.useState(false);
 const {user , setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery,  getCartCount} = useAppContext();

 const logOut =  async ()=>{
    setUser(null);
    navigate('/')
 }

 useEffect(()=>{
    if(searchQuery.length > 0){
        navigate("/products")
    }
 },[searchQuery])

  return (
           <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all ">
                <NavLink to="/" onClick={()=>setOpen(false)}>
                    <img className="h-9" src={assets.logo} alt="logo" />
                </NavLink>
    
                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center gap-8">
                    <NavLink to ="/"> Home </NavLink>
                    <NavLink to ="/products"> All Products </NavLink>
                    <NavLink to ="/"> Contact </NavLink>
                    
                    
                    {/* search input */}
                    <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                        <input onChange={(e)=>setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                        <img src={assets.search_icon} alt='Search' className='w-4 h-4'/>
                    </div>
                    
                    {/*  cart */}
                    <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                        <img src={assets.nav_cart_icon} alt="Cart Image" className='w-6 opacity-80 ' />
                        <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                    </div>
                    
                    {/* button */}
                    {!user ? (
                    <button onClick={()=>setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Login
                    </button>
                    ): (
                        <div className='relative group'>
                            <img src={assets.profile_icon} alt="Profile" className='w-10' />
                            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40 '>
                                <li onClick={()=>navigate('my-orders')} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My orders</li>
                                <li onClick={logOut} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                            </ul>
                        </div>
                    )} 
                </div>

                <div className='flex items-center gap-6 sm:hidden'>
                    <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                        <img src={assets.nav_cart_icon} alt="Cart Image" className='w-6 opacity-80 ' />
                        <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[16px] h-[16px] rounded-full">{getCartCount()}</button>
                    </div>

                    <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" >
                    {/* Menu Icon  */}
                    {open ?  <MdClose size={28} color='#44ae7c'/> : <CgMenuRightAlt size={28} color='#44ae7c'/>}
                    </button>
                </div>
    
    
    
                {/* Mobile Menu */}
                { open && (
                    <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-30`}>
                    <NavLink to ="/" onClick={()=>setOpen(!open)}> Home </NavLink>
                    <NavLink to ="/products" onClick={()=>setOpen(!open)}> All Products </NavLink>
                    {user ? <NavLink to ="/" onClick={()=>setOpen(!open)}> My Orders </NavLink> : null }
                    <NavLink to ="/" onClick={()=>setOpen(!open)}> Contact </NavLink>

                   {!user ? (
                       <button onClick={()=>{
                        setOpen(!open);
                        setShowUserLogin(true)
                       }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Login
                       </button>
                   ) : (
                       <button onClick={logOut} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                       Logout
                   </button>)} 
                </div>
                )}
          </nav>
        )
}

export default Navbar