import Navigation from "./components/Navigation";
import Card from "./components/Card";

export default function Home() {
  return (
    <div className="flex items-center  bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center px-16 bg-white dark:bg-black sm:items-start">
        <Navigation />
        <div className="w-full mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} link="#" />
          ))}
        </div>
      </main>
    </div>
  );
}
