import Header from '../components/Header'

export default function CreateUser() {
  return (
    <main className="w-full flex max-sm:flex-col-reverse min-h-screen max-sm:bg-[white]">
    <div className='sm:w-[90px] max-sm:flex max-sm:justify-center'>
      <Header />
    </div>
    <div className="w-full p-4 max-sm:p-0 max-sm:mb-[80px]">
      {/* <CreatePetForm /> */}
    </div>
  </main>
  )
}
