
import Card from '../Card/Card';
import Banner from '../Banner/Banner';
import Electronics from '../../Products/ElectronicsProduct/Electronics';

const Home = () => {
    return (
        <div>

            <section className='-mt-4'>
            <Banner></Banner>
            </section>


            <section>

                <Electronics></Electronics>

            </section>


            
        </div>
    );
};

export default Home;