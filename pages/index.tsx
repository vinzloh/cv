import SheetRenderer from "components/SheetRenderer";

export default function Home() {
  return (
    <div className='container h-full mx-auto flex'>
      <main className='flex flex-col m-auto justify-center items-center'>
        <SheetRenderer />
      </main>
    </div>
  );
}
