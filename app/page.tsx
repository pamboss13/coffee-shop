import Navigation from "./components/Navigation";
import Card from "./components/Card";
import { prisma } from "./lib/prisma";

export default async function Home() {
  // Fetch all products from database
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex items-center  bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center px-16 bg-white dark:bg-black sm:items-start">
        <Navigation />
        <div className="w-full mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No products available yet. Add some in the admin panel!
            </div>
          ) : (
            products.map((product) => (
              <Card
                key={product.id}
                link="#"
                name={product.name}
                description={product.description}
                price={product.price}
                available={product.available}
                imageUrl={product.imageUrl}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
