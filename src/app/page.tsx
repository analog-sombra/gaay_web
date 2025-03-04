// import About from "../components/home/about";
// import Banner from "../components/home/banner";
// // import FAQ from "./components/home/faq";
// import Footer from "../components/home/footer";
// import Header from "../components/home/header";
// import Hero from "../components/home/hero";
// import Info from "../components/home/info";

import About from "@/components/home/about";
import Banner from "@/components/home/banner";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import Info from "@/components/home/info";
import Message from "@/components/home/message";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Message />
      <Info />
      <About />
      {/* <FAQ /> */}
      <div className="mt-10"></div>
      <Banner />
      <Footer />
    </div>
  );
}
