
import CardImageHomepage from "@/components/card/cardImageHomepage";
import React from "react";

export default function page() {
  return (
    <div className="py-10 ">
      <div className="grid place-items-center">
        <h1 className="px-10 py-2 w-fit rounded-md bg-blue-500 text-white text-2xl">
          Test-Page
        </h1>
      </div>
      <div className="grid w-full place-items-center">
        <div className="w-fit grid grid-cols-2 place-items-center gap-0">
        <CardImageHomepage lable="Welcom" imgURL="/aboutus/aboutus_gabel.jpg"/>
        <CardImageHomepage lable="To" imgURL="/aboutus/aboutus_bam.jpg"/>
        <CardImageHomepage lable="Our" imgURL="/aboutus/aboutus_por.jpg"/>
        <CardImageHomepage lable="IoT-Platform" imgURL="/aboutus/watid.jpg"/>
      </div>
      </div>
      
    </div>
  );
}
