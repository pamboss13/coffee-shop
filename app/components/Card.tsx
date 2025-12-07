export default function Card() {
  return (
    <>
      <div className="text-center bg-orange-200 hover:-translate-y-1 border-2 border-white hover:shadow-orange-200">
        <div className="text-black py-4 border-b-2 border-black">
          <h3>Item Title</h3>
        </div>
        <div className="text-black">
          <ul className="decoration-none">
            <li>Coffee Detail 1</li>
            <li>Coffee Detail 2</li>
            <li>Coffee Detail 3</li>
          </ul>
        </div>
      </div>
    </>
  )
}
