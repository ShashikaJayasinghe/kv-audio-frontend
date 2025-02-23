import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Home from "./home";
import Contact from "./contact";
import Gallery from "./gallery";
import Items from "./items";
import Reviews from "./review";
import ErrorNotFound from "./error";

export default function HomePage () {
    return(
        <>
            <Header />
            <div className="h-[calc(100vh-100px)] w-full">
                <Routes path="/*">
                    <Route path="contact" element={<Contact />}></Route>
                    <Route path="gallery" element={<Gallery />}></Route>
                    <Route path="items" element={<Items />}></Route>
                    <Route path="reviews" element={<Reviews />}></Route>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/*" element={<ErrorNotFound />}></Route>
                </Routes>
            </div>

        </>
    )
}