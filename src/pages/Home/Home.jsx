import React from 'react';
import FAQ from '../../Components/FAQ';
import Support from '../../Components/Support';
import CategorySection from '../../Components/CategorySection';


const Home = () => {
    return (
        <div>
            <CategorySection></CategorySection>
          <Support></Support>
           <FAQ></FAQ>
        </div>
    );
};

export default Home;