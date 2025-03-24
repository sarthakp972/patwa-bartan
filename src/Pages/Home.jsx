import React from 'react';
import PatwaNavbar from '../Components/PatwaNavbar';
import PatwaNavbar2 from '../Components/PatwaNavbar2';
import CarouselComponent from '../Components/CarouselComponent';
import HomeHero1 from '../Components/HomeHero1';
import HomeHero2 from '../Components/HomeHero2';
import HomeGiftPromotion from '../Components/HomeGiftPromotion';
import HomeViewAll from '../Components/HomeViewAll';
import HomeShopUtility from '../Components/HomeShopUtility';
import RunningNav from '../Components/RunningNav';
import "../Css-page/Home.css";  // ✅ Import CSS file for styling
import SeasonalBanner from '../Components/HomeSeasonalBanner';
import HomeSeasonalBanner2 from '../Components/HomeSasonalBanner2';

function Home() {
  return (
    <div className="home-container">  {/* ✅ Add this wrapper */}
      <CarouselComponent />
      <hr/>
      <RunningNav textArray={["New Arrivals!", "Big Discounts!", "Quality You Can Trust!", "Shop Now!"]} />
      <HomeHero1 />
      <hr/>
      <SeasonalBanner/>
      <hr/>
      <HomeHero2 />
      <hr/>
      <HomeGiftPromotion />
      <hr/>
      <HomeSeasonalBanner2/>
      <hr/>
      <HomeShopUtility />
      <hr/>
      <HomeViewAll />
      <hr/>
    </div>
  );
}

export default Home;
