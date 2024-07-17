/**
 * v0 by Vercel.
 * @see https://v0.dev/t/b1fKL1bq8V5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import ContactForm from '@/app/(shadcn)/(public)/meedoen/_components/contact.form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Component() {
  return (
    <div className='w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
      <div className='space-y-6'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-primary'>Oogned inzetten</h1>
          <p className='mt-3 text-lg text-muted-foreground'>
            Maak ook gebruik van Oogned en draag bij aan de optimalisatie van doorverwijzingen naar gespecialiseerde oogzorg! Of u nu een huisarts, opticien, optometrist of een andere zorgprofessional
            bent, uw input is cruciaal om de efficiëntie te verbeteren, wachtlijsten te verkorten en de kosten te verlagen. Vul het onderstaande formulier in om een uitnodiging te ontvangen en ontdek
            hoe Oogned uw praktijk kan ondersteunen bij het bieden van optimale oogzorg aan patiënten.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Verzoek om gebruik te maken van Oogned</CardTitle>
            <CardDescription>Vul het onderstaande formulier in en wij zullen uw verzoek beoordelen en contact met u opnemen.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  )
}
