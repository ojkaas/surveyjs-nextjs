/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7kTcgS5PFaz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Image from 'next/image'

export default function Component() {
  return (
    <>
      <section className='w-full pt-12 md:pt-24 lg:pt-32 pb-8 border-b'>
        <div className='container space-y-10 xl:space-y-16 px-4 md:px-6'>
          <div className='grid gap-4 md:grid-cols-2 md:gap-16'>
            <div className='flex flex-col items-start space-y-4'>
              <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>Oogned</div>
              <h1 className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]'>De juiste oogzorg op de juiste plek</h1>
              <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl'>
                Onze gebruiksvriendelijke vragenlijst helpt patiënten de juiste oogzorg te geven. Dit kan bij een opticien, optometrist, orthoptist of oogarts zijn. Daarnaast zijn er veel oogklachten
                die de huisarts zelf kan behandelen.
              </p>
            </div>
            <div className='flex justify-center'>
              <Image src={'/eye_doctor.jpeg'} priority={true} alt='Oogned' className='aspect-square overflow-hidden object-contain' width={200} height={200} />
            </div>
          </div>
        </div>
      </section>
      <section id='about' className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
        <div className='container space-y-12 px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Over Oogned</h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Welkom bij Oogned, dé innovatieve oplossing voor uw oogzorgbehoeften. Onze gebruiksvriendelijke vragenlijst helpt u snel en eenvoudig te bepalen welke oogzorgprofessional het beste bij
                uw klachten past, of het nu een opticien, optometrist, orthoptist of oogarts betreft. Daarnaast geven we inzicht in oogklachten die uw huisarts zelf kan behandelen, zodat u altijd de
                juiste zorg op het juiste moment krijgt. Bij Oogned staan uw ogen centraal!
              </p>
            </div>
          </div>
          <div className='mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3'>
            <div className='grid gap-1'>
              <h3 className='text-lg font-bold'>Onze Missie</h3>
              <p className='text-sm text-muted-foreground'>
                Onze missie bij Oogned is om door gerichte doorverwijzingen de efficiëntie en toegankelijkheid van specialistische oogzorg te verbeteren, wachtlijsten te verkorten en de
                gezondheidszorgkosten te verlagen, wat resulteert in betere gezondheidsuitkomsten voor patiënten.
              </p>
            </div>
            <div className='grid gap-1'>
              <h3 className='text-lg font-bold'>Onze Waarde</h3>
              <p className='text-sm text-muted-foreground'>
                Bij Oogned staan efficiëntie, toegankelijkheid, kostenbesparing en hoogwaardige zorg centraal, met als doel patiënten de best mogelijke ooggezondheidszorg te bieden.
              </p>
            </div>
            <div className='grid gap-1'>
              <h3 className='text-lg font-bold'>Onze oorsprong</h3>
              <p className='text-sm text-muted-foreground'>
                Oogned is ontstaan uit de passie en expertise van oogartsen die vastbesloten zijn om patiënten beter en sneller te helpen. Met hun diepgaande kennis en ervaring hebben zij een platform
                ontwikkeld dat de kwaliteit en toegankelijkheid van oogzorg naar een hoger niveau tilt.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id='product' className='w-full py-12 md:py-24 lg:py-32 '>
        <div className='container space-y-12 px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Ons product</h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Oogned is een innovatieve app die patiënten helpt de juiste oogzorgprofessional te vinden door middel van een gebruiksvriendelijke vragenlijst.
              </p>
            </div>
          </div>
          <div className='mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3'>
            <div className='grid gap-1'>
              <h3 className='text-lg font-bold'>Eenvoudig</h3>
              <p className='text-sm text-muted-foreground'>
                Eenvoud staat centraal: onze app gebruikt uw input om de vragenlijst zo gebruiksvriendelijk en gemakkelijk mogelijk te maken, zodat u snel en efficiënt de juiste oogzorg vindt.
              </p>
            </div>
            <div className='grid gap-1'>
              <h3 className='text-lg font-bold'>Slim</h3>
              <p className='text-sm text-muted-foreground'>
                Slim en innovatief: ons algoritme, gebaseerd op de expertise van oogartsen, stelt een passende diagnose door nauwkeurig te analyseren en te interpreteren wat u invult.
              </p>
            </div>
            <div className='grid gap-1'>
              <h3 className='text-lg font-bold'>Veilig</h3>
              <p className='text-sm text-muted-foreground'>Veiligheid voorop: Oogned slaat geen persoonlijke gegevens op, waardoor uw privacy te allen tijde gewaarborgd is.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
