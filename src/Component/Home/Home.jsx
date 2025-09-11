
import Banner from '../Banner/Banner';
import Electronics from '../../Products/ElectronicsProduct/Electronics';
import WomentCollecttion from '../../Products/WomenCollections/WomentCollecttion';
import WinterFashion from '../../Products/WinterFashion/WinterFashion';
import GadgetAndGare from '../../Products/Gadget&Gare/GadgetAndGare';

const Home = () => {
    return (
        <div>
            {/* for banner */}
            <section className='-mt-4'>
                <Banner></Banner>
            </section>

            {/* for electronics product */}
            <section>
                <Electronics></Electronics>
            </section>

            {/* women collection */}

            <section className='max-w-7xl m-auto mt-20'>
                <WomentCollecttion></WomentCollecttion>
            </section>

            {/* for winter collections  */}

            <section>
                <WinterFashion></WinterFashion>
            </section>

            <section>
                <GadgetAndGare></GadgetAndGare>
            </section>





        </div>
    );
};

export default Home;