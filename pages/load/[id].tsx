import SheetRenderer from "components/SheetRenderer";

export default function Load() {
  return (
    <div className='container h-full mx-auto flex'>
      <main className='flex flex-col m-auto justify-center items-center'>
        <SheetRenderer />
      </main>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  return { props: { id: context.query.id } };
}
