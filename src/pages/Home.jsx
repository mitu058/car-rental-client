import React from 'react';
import Banner from '../components/Banner';
import WhyChooseUs from '../components/WhyChooseUs';
import RecentListing from '../components/RecentListing';
import SpecialOffers from '../components/SpecialOffers';
import ReviewSection from '../components/ReviewSection';

const Home = () => {
   
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <RecentListing></RecentListing>
            <SpecialOffers></SpecialOffers>
            <ReviewSection></ReviewSection>
          
        </div>
    );
};

export default Home;