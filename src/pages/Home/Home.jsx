import React from 'react';
import FAQ from '../../Components/FAQ';
import Support from '../../Components/Support';
import CategorySection from '../../Components/CategorySection';
import AdminSlider from '../../Components/AdminSlider';
import DiscountProducts from '../../Components/DiscountProducts';

import CustomerReviews from '../../Components/CustomerReviews';
import LatestProducts from '../../Components/LatestProducts';
import Benefits from '../../Components/Benefits';








const Home = () => {
    return (
        <div>
            <title>Home || MediNest</title>
         <AdminSlider></AdminSlider>
            <CategorySection></CategorySection>
            
          <LatestProducts></LatestProducts>
          <DiscountProducts></DiscountProducts>
          <Support></Support>
          <Benefits></Benefits>
           <CustomerReviews></CustomerReviews>
           <FAQ></FAQ>
         
        </div>
    );
};

export default Home;