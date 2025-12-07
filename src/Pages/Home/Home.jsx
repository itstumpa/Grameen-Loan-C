import HeroSection from "./Sections/HeroSection";
import HowitWorks from "./Sections/HowitWorks";
import FAQ from "./Sections/FAQ";
import OurServices from "./Sections/OurServices/OurServices";
import Brands from "./Sections/Brands";
import FeaturesSection from "./Sections/FeaturesSection";
import CTASection from "./Sections/CTASection";
import Reviews from "./Sections/Reviews";
import WhyChooseUs from "./Sections/WhyChooseUs";
import LoanCategories from "./Sections/LoanCategories";



const Home = () => {


  return (
    <div className="home-page">
      <HeroSection />

       <div>
       
       <LoanCategories/>
      </div>

 
      <div className="" >
        <HowitWorks/>
      </div>
<div>
  <div>
  <Brands/>
</div>
</div>
      <CTASection/>
      <Reviews/>

    
     
      
    </div>
  );
};

export default Home;
