import Header from '../components/Header'

export default function Home() {
  return (
    <main className="w-full flex max-sm:flex-col-reverse min-h-screen">
    <div className={`sm:w-[90px] max-sm:flex max-sm:justify-center`}>
        <Header />
    </div>
    </main>
  )
}
