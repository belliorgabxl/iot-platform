"use client";
type Props={
    isLoading:boolean;
}

export default function AboutUsPage_article({isLoading}:Props) {

  return(
    <div
        className={`grid   ${
          isLoading
            ? "bg-gray-900 hover:bg-gray-700 duration-1000  mx-5 rounded-md shadow-md  my-5 py-3 lg:py-10 px-3 lg:px-10 lg:w-[1000px] w-fit"
            : "opacity-0 w-2/5"
        }`}
      >
        <div className="flex items-center justify-center lg:justify-start">
          <span className="text-xl lg:text-3xl text-white">Telecommunication</span>
          <span className="mx-5">
            <img src="/aboutus/signal_icon.png" width={40} height={40} />
          </span>
        </div>
        <hr className="my-5" />
        <p className="text-sm lg:text-lg text-white text-md ">
          &nbsp;&nbsp;&nbsp;&nbsp;Telecommunications engineering is an academic field that stems from the integration of electrical engineering and computer science knowledge to enhance telecommunications systems. This specialized knowledge in telecommunications covers a diverse range of engineering disciplines that connect with electronics, civil engineering, structural engineering, foundation work, antenna mast installations, and electrical engineering. Even in the medical field, advanced telecommunications engineering is applied. Telecommunications engineers use a variety of equipment and transmission media from numerous manufacturers to design telecommunications network infrastructures. Commonly referred to as the plant, outside plant, and inside plant in the telecommunications industry.
        </p>
      </div>

  )
}
