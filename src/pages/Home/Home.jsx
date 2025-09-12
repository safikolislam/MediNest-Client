import React from 'react';
import FAQ from '../../Components/FAQ';
import Support from '../../Components/Support';
import CategorySection from '../../Components/CategorySection';
import AdminSlider from '../../Components/AdminSlider';








const Home = () => {
    return (
        <div>
         <AdminSlider></AdminSlider>
            <CategorySection></CategorySection>
          <Support></Support>
           <FAQ></FAQ>
        </div>
    );
};

export default Home;