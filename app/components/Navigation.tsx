import Image from "next/image";

export default function Navigation() {

  return (
    <div className="mt-2 border-b border-b-2 border-orange-200 items-center flex justify-between w-full">
      <Image
        src="/logo.png"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />
      <ul className="flex text-orange-200 uppercase text-2xl space-x-4 ">
        <li className="hover:underline cursor-pointer"><a href="/">Home</a></li>
        <li className="hover:underline">All Items</li>
        <li className="hover:underline">Contact</li>
      </ul>
    </div>
  )
}

