import React from 'react';
import Banner from '../components/Banner';
import WhyChooseUs from '../components/WhyChooseUs';
import RecentListing from '../components/RecentListing';

const Home = () => {
   
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <RecentListing></RecentListing>
          
        </div>
    );
};

export default Home;