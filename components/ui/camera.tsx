import React from "react";  
import { useTranslation } from "@/hooks/use-translation"

export default function Camera() { 
    return (
        <div className="flex flex-col h-[550px] justify-center gap-4   bg-gray-100">
            <center>

        <h1 className="text-2xl  font-bold ">Camera</h1>
            </center>
       
        <div>
          <video controls className="w-full h-[245px]" id="video" autoPlay></video>
        </div>
        <div>
          <video controls className="w-full h-[245px]" id="video" autoPlay></video>
        </div>
      </div>
    );
}
