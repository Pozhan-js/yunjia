import React, { useState } from 'react'
import Footer from "@/components/mobile/widget/Footer";
import { useRequest, useThrottle } from "ahooks";
import FaqContent from '@/components/widget/FaqsPage/mobile/FaqContent';

export default function FaqsPage() {
  return (
    <div className="font-gtwal flex flex-col overflow-hidden bg-[#25194A] relative">
      <FaqContent></FaqContent>
      <Footer absolute={false} bgColor={'bg-[#25194A]'}></Footer>
    </div>
  )
}
