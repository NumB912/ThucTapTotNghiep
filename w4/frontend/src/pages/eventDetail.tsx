import React from "react";
import Calendar from "../component/calendar/calendar";
import CardEventChild from "../component/CardEventChild";
import CardEventDetail from "../component/CardEventDetail";

const EventDetail = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr_350px] gap-8 w-full bg-gradient-to-t from-purple-400 to-pink-200 p-20">
        <div className="">
          <CardEventDetail />
          <div className="mt-8">
            <div className="border-1.5 border-gray-100 shadow-lg bg-white p-5 rounded-md ">
              <div>
                <p className="text-2xl font-bold my-3">
                  Our favorite national days on Sep 17th
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  laborum, quam deserunt voluptatum possimus, rem modi quo
                  distinctio mollitia magni nostrum, eius excepturi dolorem
                  illum nesciunt. Eum quidem tempora accusamus. Lorem ipsum
                  dolor, sit amet consectetur adipisicing elit. Labore veniam
                  provident omnis totam ex perspiciatis commodi cumque officiis
                  sit earum, unde ab praesentium. Minus nobis aperiam architecto
                  voluptatibus in odit. Lorem ipsum dolor, sit amet consectetur
                  adipisicing elit. Eveniet tempora corporis, nostrum veritatis
                  ipsam sunt repudiandae aspernatur. Iste placeat ab inventore
                  mollitia iure a aperiam dolorum corporis. Perspiciatis,
                  asperiores exercitationem.
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold my-3">
                  Our favorite national days on Sep 17th
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  laborum, quam deserunt voluptatum possimus, rem modi quo
                  distinctio mollitia magni nostrum, eius excepturi dolorem
                  illum nesciunt. Eum quidem tempora accusamus. Lorem ipsum
                  dolor, sit amet consectetur adipisicing elit. Labore veniam
                  provident omnis totam ex perspiciatis commodi cumque officiis
                  sit earum, unde ab praesentium. Minus nobis aperiam architecto
                  voluptatibus in odit. Lorem ipsum dolor, sit amet consectetur
                  adipisicing elit. Eveniet tempora corporis, nostrum veritatis
                  ipsam sunt repudiandae aspernatur. Iste placeat ab inventore
                  mollitia iure a aperiam dolorum corporis. Perspiciatis,
                  asperiores exercitationem.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
            <Calendar />
            <div className="relative">
                <img src="https://files.catbox.moe/73xbbk.gif" className="z-10"/>
                <div className="w-1/2 p-1 blur-lg left-1/2 -translate-x-1/2 bg-black rounded-full absolute bottom-1 z-0"></div>
            </div>
        </div>
      </div>

      <div className="px-20 -mt-5">
        <div className="border-1.5 border-gray-100 shadow-lg bg-white p-5 rounded-md ">
          <p className="text-2xl font-bold mb-5">
            Our favorite national days on Sep 17th
          </p>
          <div className="grid grid-cols-3 gap-5">
            <CardEventChild />
            <CardEventChild />
            <CardEventChild />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
