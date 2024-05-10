type Props = {}

function Page({}: Props) {
  return (
    <>
      <main className='flex min-h-[93dvh] h-full items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950'>
        <div className='mx-auto w-full max-w-md md:max-w-xl space-y-6'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>Email link toegezonden</h1>
            <p className='mt-2 text-gray-500 dark:text-gray-400'>Er is een inlog link naar uw email box onderweg!</p>
          </div>
        </div>
      </main>
    </>
  )
}

export default Page
