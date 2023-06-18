import lv1Img from "@/assets/images/ComposePage/lv1.png";
import lv2Img from "@/assets/images/ComposePage/lv2.png";
import lv3Img from "@/assets/images/ComposePage/lv3.png";
import lv4Img from "@/assets/images/ComposePage/lv4.png";

export default function LvIcon({lv, className=''}) {
    switch (lv) {
        case 1:
            return <img src={lv1Img} className={'w-6 h-6 object-cover object-center ' + className}/>
        case 2:
            return <img src={lv2Img} className={'w-6 h-6 object-cover object-center ' + className}/>
        case 3:
            return <img src={lv3Img} className={'w-6 h-6 object-cover object-center ' + className}/>
        case 4:
            return <img src={lv4Img} className={'w-6 h-6 object-cover object-center ' + className}/>
        default:
            return <img src={lv1Img} className={'w-6 h-6 object-cover object-center ' + className}/>
    }
}
