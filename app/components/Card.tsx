import { Fragment } from "react/jsx-runtime"

export interface CardProps {
  link: string;
};

export default function Card({ link }: CardProps) {
  return (
    <Fragment>
      <div className="text-center bg-orange-200 hover:-translate-y-1 transform-all duration-500 hover:shadow-orange-200">
        <div className="text-black py-2 border-b-2 border-black">
          <h3>Item Title</h3>
        </div>
        <div className="text-black py-2">
          <ul className="decoration-none">
            <li>Coffee Detail 1</li>
            <li>Coffee Detail 2</li>
            <li>Coffee Detail 3</li>
          </ul>
        </div>
        <div className="px-5 py-2 bg-black text-orange-200 hover:shadow-black border border-orange-200 cursor-pointer">
          <a href={link}>
            Purchase Now
          </a>
        </div>
      </div>
    </Fragment>
  )
}
