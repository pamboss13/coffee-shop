import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <div className="flex items-center  bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center px-16 bg-white dark:bg-black sm:items-start">
        <Navigation />
      </main>
    </div>
  );
}
