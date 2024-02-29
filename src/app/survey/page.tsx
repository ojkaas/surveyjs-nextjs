'use client'
import SurveyComponent from "@/components/Survey";

// import dynamic from 'next/dynamic';
// const SurveyComponent = dynamic(() => import("@/components/Survey"), { ssr: false });


export default function Survey() {
  return (
    <div className="flex justify-center items-center w-full">
      <SurveyComponent />
    </div>
  );
}
