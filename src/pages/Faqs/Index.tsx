import Footer from "@/components/widget/Footer/Footer";
import FaqContent from '@/components/widget/FaqsPage/FaqContent';

export default function FaqsPage() {
  return (
      <div className="font-gtwal flex flex-col overflow-hidden bg-[#0C0C0D] relative">
        <FaqContent></FaqContent>
        <Footer absolute={false} className={''}></Footer>
      </div>
  )
}
