'use client'
import Homepage_article from "@/components/article/homePageDetail";
import CLShomepage from "@/components/CLS/CLShomepage";

// bg-[url('/assets/bghome.jpg')]
export default function Home() {
  return (
    <div className=" w-full pb-40 bg-gradient-to-tr from-gray-800 via-gray-500 to-gray-900 ">
    <div className="flex justify-center">
      <div className="bg-gray-800 mb-5">
        <CLShomepage/>
      </div>
    </div>
    <Homepage_article/>
  </div>
  );
}
