"use client";
type Props = {
  isLoading: boolean;
};
export default function AboutUsDetail({ isLoading }: Props) {
  return (
    <div className="grid px-5 gap-4 w-full">
      <div
        className={`duration-1000 bg-gray-900 lg:w-fit flex justify-between group lg:justify-start  hover:scale-[102%] rounded-lg ${
          isLoading ? "" : "opacity-0  px-0"
        }`}
      >
        <div className=" space-y-2  text-white px-5 lg:px-10 lg:py-5 py-3    duration-1000 ">
          <p className=" text-lg lg:text-2xl">Mr. Patarajarin Napakarn</p>
          <p className="font-bold text-xl ">Gabel</p>
          <hr />
          <p className="text-sm lg:text-lg">Studen ID : 64011224</p>
          <p className="text-sm lg:text-lg">Faculty Of Engineering</p>
        </div>
        <img
          src="/aboutus/aboutus_gabel.jpg"
          width={200}
          height={200}
          alt="gabel"
          className="rounded-r-lg w-[150px] lg:w-[200px] object-cover group-hover:opacity-80 lg:h-auto "
        />
      </div>

      {/* bam */}
      <div
        className={`duration-1000 bg-gray-900 lg:translate-x-[300px] lg:w-fit flex justify-between group lg:justify-center  hover:scale-[102%] rounded-lg ${
          isLoading ? "" : "opacity-0  px-0"
        }`}
      >
        <div className=" space-y-2  text-white px-5 lg:px-10 lg:py-5 py-3   duration-1000 ">
          <p className=" text-lglg:text-2xl">Ms. Chanidapha Chatsak</p>
          <p className="font-bold text-xl">Bam</p>
          <hr />
          <p className="text-sm lg:text-lg">Studen ID : 64010153</p>
          <p className="text-sm lg:text-lg">Faculty Of Engineering</p>
        </div>
        <img
          src="/aboutus/aboutus_bam.jpg"
          width={200}
          height={200}
          alt="gabel"
           className="rounded-r-lg w-[150px] lg:w-[200px] object-cover group-hover:opacity-80 lg:h-auto "
        />
      </div>

      <div
        className={`duration-1000 bg-gray-900 lg:translate-x-[600px] lg:w-fit flex justify-between group lg:justify-center  hover:scale-[102%] rounded-lg ${
          isLoading ? "" : "opacity-0  px-0"
        }`}
      >
        <div className=" space-y-2  text-white px-5 lg:px-10 lg:py-5 py-3   duration-1000 ">
          <p className=" text-lg lg:text-2xl">Mr. Kasama Mingmuang</p>
          <p className="font-bold text-xl -3">Por</p>
          <hr />
          <p className="text-sm lg:text-lg">Studen ID : 64010027</p>
          <p className="text-sm lg:text-lg">Faculty Of Engineering</p>
        </div>
          <img
            src="/aboutus/aboutus_por.jpg"
            width={200}
            height={200}
            alt="por"
             className="rounded-r-lg w-[150px] lg:w-[200px] object-cover group-hover:opacity-80 lg:h-auto "
          />
      </div>
    </div>
  );
}
