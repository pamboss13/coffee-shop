"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { toggleCart, selectCartItemCount } from "../slices/cartSlice";

export default function Navigation() {
  const dispatch = useAppDispatch();
  const cartItemCount: number = useAppSelector(selectCartItemCount);

  const showCartHandler = () => {
    dispatch(toggleCart())
  }

  return (
    <div className="mt-2 border-b-2 border-orange-200 items-center flex justify-between w-full">
      <Image
        src="/logo.png"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />
      <ul className="flex text-orange-200 uppercase text-2xl space-x-4 items-center">
        <li className="hover:underline cursor-pointer"><Link href="/">Home</Link></li>
        <li className="hover:underline cursor-pointer">All Items</li>
        <li className="hover:underline cursor-pointer">Contact</li>
        <li className="hover:underline cursor-pointer">
          <button onClick={showCartHandler} className="flex items-center space-x-1">
            {cartItemCount > 0 && (
              <span className="bg-orange-200 text-black rounded-full w-6 h-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span>Cart</span>

          </button>
        </li>
        <li className="hover:underline cursor-pointer"><Link href="/admin">Admin</Link></li>
      </ul>
    </div>
  )
}

