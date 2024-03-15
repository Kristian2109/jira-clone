import { Footer } from "../components/generic/Footer"
import { HomeContent } from "../components/home/HomeContent"
import { HomeHeader } from "../components/home/HomeHeader"
import "./Home.css"

export const Home = () => {
    return (
        <div className="container-fluid p-0">
            <HomeHeader/>
            <HomeContent/>
            <Footer/>
        </div>
    )
}