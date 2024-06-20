import Image from 'next/image'
import Link from 'next/link'

export default function Homepage() {
  return (
    <main className='flex-1'>
      <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
            <div className='flex flex-col justify-center space-y-4'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>Kom in contact met de juiste oog experts</h1>
                <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                  Onze gebruiksvriendelijke vragenlijst helpt patiënten de geschikte oogspecialist voor hun behoeften te vinden. Ontvang gepersonaliseerde aanbevelingen over wie u kunt contacteren.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Link
                  href='overzicht'
                  className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                  prefetch={false}
                >
                  Kom in contact met een expert
                </Link>
              </div>
            </div>
            <Image src={'/eye_doctor.jpeg'} priority={true} alt='Hero' className='mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last' width={500} height={500} />
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>Hoe werkt het?</div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Een simpele vragenlijst voor het vinden van de beste expert</h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Onze gebruiksvriendelijke vragenlijst helpt u uw oogaandoening te identificeren en verbindt u met de perfecte specialist voor uw behoeften. Geen giswerk meer, alleen gepersonaliseerde
                aanbevelingen.
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
                    <h3 className='text-xl font-bold'>Neem contact op met een aangesloten partij.</h3>
                    <p className='text-muted-foreground'>Een aangesloten partij kan u een vragenlijst opsturen en hier de resultaten van bepalen.</p>
                  </div>
                </li>
                <li>
                  <div className='grid gap-1'>
                    <h3 className='text-xl font-bold'>Vul de vragenlijst in.</h3>
                    <p className='text-muted-foreground'>Onze vragenlijst helpt ons uw oogaandoening en symptomen te begrijpen.</p>
                  </div>
                </li>
                <li>
                  <div className='grid gap-1'>
                    <h3 className='text-xl font-bold'>Ontvang gepersonaliseerde aanbevelingen</h3>
                    <p className='text-muted-foreground'>We matchen u met de beste oogspecialisten in uw omgeving op basis van uw behoeften.</p>
                  </div>
                </li>
                <li>
                  <div className='grid gap-1'>
                    <h3 className='text-xl font-bold'>Kom in contact met een expert</h3>
                    <p className='text-muted-foreground'>Plan een consultatie met de aanbevolen specialist en ontvang de zorg die u nodig heeft.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>Testimonials</div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Lees de ervaringen van onze tevreden patiënten</h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Onze patiënten hebben geweldige ervaringen gehad met het verbinden met de juiste oogspecialisten via ons platform. Lees hun verhalen om te zien hoe wij u ook kunnen helpen.
              </p>
            </div>
          </div>
          <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
            <div className='flex flex-col justify-center space-y-4'>
              <div className='grid gap-1'>
                <h3 className='text-xl font-bold'>&quot;Ik heb eindelijk de juiste specialist gevonden voor mijn aandoening.&quot;</h3>
                <p className='text-muted-foreground'>
                  &quot;Ik had jarenlang geworsteld met mijn oogproblemen, maar Oogned heeft me geholpen de perfecte expert te vinden die mijn behoeften begreep. Het proces was zo gemakkelijk en
                  duidelijk.&quot;
                </p>
                <p className='text-muted-foreground'>- Sarah, 35</p>
              </div>
            </div>
            <div className='flex flex-col justify-center space-y-4'>
              <div className='grid gap-1'>
                <h3 className='text-xl font-bold'>&quot;Ik ben zo dankbaar voor de gepersonaliseerde zorg die ik heb ontvangen.&quot;</h3>
                <p className='text-muted-foreground'>
                  &quot;Het Oogned-team luisterde echt naar mijn zorgen en koppelde me aan een oogspecialist die de tijd nam om mijn unieke situatie te begrijpen. Ik ben zo tevreden over het niveau
                  van zorg dat ik heb ontvangen. &quot;
                </p>
                <p className='text-muted-foreground'>- Michael, 42</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>Kom nu in contact</div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Zet de eerste stap naar een betere ooggezondheid</h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Begin uw reis naar het vinden van de juiste oogspecialist door een paar eenvoudige vragen te beantwoorden. We zullen gepersonaliseerde aanbevelingen bieden om u te helpen de zorg te
                krijgen die u nodig heeft.
              </p>
            </div>
            <div className='mx-auto w-full max-w-sm space-y-2'>
              <Link
                href='#'
                className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                prefetch={false}
              >
                Kom in contact met een expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
