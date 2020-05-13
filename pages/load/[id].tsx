import SheetRenderer from 'components/SheetRenderer'

export default function Load() {
  return (
    <div className="container h-full mx-auto flex">
      <main className="flex flex-col m-auto justify-center items-center">
        <SheetRenderer />
      </main>
    </div>
  )
}

export async function getStaticProps({ params }: any) {
  return { props: { id: params.id } }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}
