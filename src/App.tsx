import Header from '@/components/Header'
import Hero from '@/components/Hero'
import heroImg from '@/assets/illustration-working.svg'
import LinkShortener from '@/components/LinkShortener'
import Statistics from '@/components/Statistics'
function App() {
 
  return (
    <>
      <div className="bg-white">
        <Header/>
        <Hero
        title="More than just shorter links"
        subtitle="Build your brand's recognition and get detailed insights on how your links are perfoming."
        buttonText="Get Started"
        imageUrl={heroImg}
        onButtonClick={()=>{console.log("Button clicked")}}
         />
        <div className="flex relative bg-red-500 justify-center ">
          <LinkShortener/>
          <Statistics/>
        </div>
      </div>
    </>
  )
}

export default App
