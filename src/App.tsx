import Header from '@/components/Header'
import Hero from '@/components/Hero'
import heroImg from '@/assets/illustration-working.svg'
import LinkShortener from '@/components/LinkShortener'
import Statistics from '@/components/Statistics'
import BoostLinks from '@/components/BoostLinks'
import Footer from '@/components/Footer'
function App() {
 
  return (
    <>
      <div className="bg-white site-container">
        <Header/>
        <Hero
        title="More than just shorter links"
        subtitle="Build your brand's recognition and get detailed insights on how your links are perfoming."
        buttonText="Get Started"
        imageUrl={heroImg}
        onButtonClick={()=>{console.log("Button clicked")}}
         />
        <div className="flex flex-col bg-Gray justify-center ">
          <div className="flex bg-transparent justify-center w-full relative">
            <LinkShortener/>
          </div>
          <Statistics/>
        </div>
        <BoostLinks/>
        <Footer/>
      </div>
    </>
  )
}

export default App
