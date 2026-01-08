import { Fragment } from "react/jsx-runtime"

export interface CardProps {
  link: string;
  name: string;
  description: string | null;
  price: number;
  available: boolean;
  imageUrl: string | null;
};

export default function Card({ link, name, description, price, available }: CardProps) {
  return (
    <Fragment>
      <div className="text-center bg-orange-200 hover:-translate-y-1 transform-all duration-500 hover:shadow-orange-200">
        <div className="text-black py-2 border-b-2 border-black">
          <h3 className="font-semibold">{name}</h3>
        </div>
        <div className="text-black py-2 px-4">
          {description ? (
            <p className="text-sm min-h-[60px]">{description}</p>
          ) : (
            <p className="text-sm text-gray-600 min-h-[60px]">No description available</p>
          )}
          <p className="text-lg font-bold mt-2">${price.toFixed(2)}</p>
          {!available && (
            <p className="text-xs text-red-600 mt-1">Currently unavailable</p>
          )}
        </div>
        <div className={`px-5 py-2 bg-black text-orange-200 hover:shadow-black border border-orange-200 ${available ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}>
          <a href={available ? link : undefined} className={!available ? 'pointer-events-none' : ''}>
            {available ? 'Purchase Now' : 'Out of Stock'}
          </a>
        </div>
      </div>
    </Fragment>
  )
}
