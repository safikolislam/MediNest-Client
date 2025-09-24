import React from 'react';
import FAQ from '../../Components/FAQ';
import Support from '../../Components/Support';
import CategorySection from '../../Components/CategorySection';
import AdminSlider from '../../Components/AdminSlider';
import DiscountProducts from '../../Components/DiscountProducts';








const Home = () => {
    return (
        <div>
            <title>Home || MediNest</title>
         <AdminSlider></AdminSlider>
            <CategorySection></CategorySection>
            
          <DiscountProducts></DiscountProducts>
          <Support></Support>
           <FAQ></FAQ>
        </div>
    );
};

export default Home;