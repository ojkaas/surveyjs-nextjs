import Image from 'next/image'
import Link from 'next/link'

export default function Homepage() {
  return (
    <main className='flex-1'>
      <section className='w-full py-5 md:py-6 lg:py-8 xl:py-12'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
            <div className='flex flex-col justify-center space-y-4'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>De juiste oogzorg op de juiste plek</h1>
                <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                  Onze gebruiksvriendelijke vragenlijst helpt patiënten de juiste oogzorg te geven. Dit kan bij een opticien, optometrist, orthoptist of oogarts zijn. Daarnaast zijn er veel
                  oogklachten die de huisarts zelf kan behandelen.
                </p>
              </div>
            </div>
            <Image
              src={'/eye_doctor.jpeg'}
              priority={true}
              alt='Hero'
              className='mx-auto aspect-square overflow-hidden rounded-xl object-cover w-96 sm:w-full lg:order-last'
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>
      <section className='w-full py-5 md:py-6 lg:py-8 xl:py-12 bg-muted'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-white px-3 py-1 text-sm'>Hoe werkt het?</div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Passende zorg via een simpele vragenlijst</h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Onze vragenlijst geeft op basis van uw klachten een advies aan de huisarts over waar u het beste terecht kunt voor uw oogheelkundige problemen.
              </p>
            </div>
          </div>
          <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
            <Image
              src={'/eye_doctor_list.jpeg'}
              priority={true}
              alt='Questionnaire'
              className='mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last'
              width={500}
              height={500}
            />
            <div className='flex flex-col justify-center space-y-4'>
              <ul className='grid gap-6'>
                <li>
                  <div className='grid gap-1'>
                    <h3 className='text-xl font-bold'>Neem contact op met de huisarts.</h3>
                    <p className='text-muted-foreground'>Wanneer u met uw oogheelkundige problemen met de huisarts contact opneemt zal de huisarts u een vragenlijst opsturen.</p>
                  </div>
                </li>
                <li>
                  <div className='grid gap-1'>
                    <h3 className='text-xl font-bold'>Vul de vragenlijst in.</h3>
                    <p className='text-muted-foreground'>Onze vragenlijst helpt ons uw oogaandoening en klachten te begrijpen.</p>
                  </div>
                </li>
                <li>
                  <div className='grid gap-1'>
                    <h3 className='text-xl font-bold'>Vragenlijst wordt bekeken middels een algoritme</h3>
                    <p className='text-muted-foreground'>
                      We koppelen uw klachten aan de meest waarschijnlijke diagnoses waarbij we rekening houden met de ernst van de klachten, de duur van de klachten en de urgentie.
                    </p>
                  </div>
                </li>
                <li>
                  <div className='grid gap-1'>
                    <h3 className='text-xl font-bold'>De uitslag krijgt u van de huisarts.</h3>
                    <p className='text-muted-foreground'>
                      De huisarts zal aan u vertellen waaraan gedacht wordt en zal u adviseren om naar de opticien of optometrist te gaan of u verwijzen naar de oogarts of orthoptist indien nodig.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-5 md:py-6 lg:py-8 xl:py-12'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>Kom nu in contact</div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Zet de eerste stap naar een betere verdeling van de oogzorg en hiermee wachtlijsten ooggezondheid</h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Dit optimaliseert de doorverwijzingen door huisartsen, wat leidt tot snellere toegang tot specialistische zorg. Dit model verbetert de efficiëntie en verlaagt wachtlijsten voor
                patiënten, terwijl het tegelijkertijd de kosten van de gezondheidszorg kan verlagen. Door een gerichte aanpak wordt de juiste oogzorg sneller ingezet, wat resulteert in betere
                gezondheidsresultaten voor patiënten.
              </p>
            </div>
            <div className='mx-auto w-full max-w-sm space-y-2'>
              <Link
                href='#'
                className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                prefetch={false}
              >
                Neem contact met ons op voor meer informatie
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
