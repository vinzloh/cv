import SheetRenderer from 'components/SheetRenderer'

export default function Load() {
  return <SheetRenderer />
}

export async function getStaticProps({ params }: any) {
  return { props: { id: params.id } }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}
