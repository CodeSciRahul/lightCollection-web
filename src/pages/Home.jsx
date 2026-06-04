import Header from "../components/header";
import Banner from "../components/banner";
import CategoriesSection from "../components/category";
import TrendingProducts from "../components/trendingProducts";
import Products from "../components/products";

const Home = () => {
    return (
        <div>
            <header>
                <Header />
            </header>
            <section>
                <Banner />
            </section>
            <section>
                <CategoriesSection />
            </section>
            <section>
                <TrendingProducts />
            </section>
            <section>
                <Products />
            </section>
        </div>
    )
}

export default Home;