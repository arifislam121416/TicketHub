import BrowserTickets from "./Components/BrowserTickets";
import Hero from "./Components/Hero";
import Testimonials from "./Components/Testimonial";
import WhyChoose from "./Components/WhyChose";




export default async function  Home ({searchParams}) {
  const { canceled } = await searchParams

  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and checkout when you'
    )
  }
  return (
   <>
   <Hero/>
  <BrowserTickets/>
   <WhyChoose/>
    <Testimonials/>
     <form action="/api/checkout_sessions" method="POST">
      <section>
       <button type="submit" role="link">
        Checkout
      </button>
     </section>
    </form>
   </>
  );
}
