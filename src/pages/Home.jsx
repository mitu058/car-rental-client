import React from 'react';
import Banner from '../components/Banner';
import WhyChooseUs from '../components/WhyChooseUs';
import RecentListing from '../components/RecentListing';
import SpecialOffers from '../components/SpecialOffers';

const Home = () => {
   
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <RecentListing></RecentListing>
            <SpecialOffers></SpecialOffers>
          
        </div>
    );
};

export default Home;