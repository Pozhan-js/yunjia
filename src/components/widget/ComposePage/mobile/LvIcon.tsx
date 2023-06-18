import lv1Img from "@/assets/images/ComposePage/lv1.png";
import lv2Img from "@/assets/images/ComposePage/lv2.png";
import lv3Img from "@/assets/images/ComposePage/lv3.png";
import lv4Img from "@/assets/images/ComposePage/lv4.png";

export default function LvIcon({ lv, className = '' }) {
    let img = lv1Img;
    switch (lv) {
        case 1:
            img = lv1Img;
            break;
        case 2:
            img = lv2Img;
            break;
        case 3:
            img = lv3Img;
            break;
        case 4:
            img = lv4Img;
            break;
    }
    return <img src={img} className={' w-10 h-10 object-cover object-center ' + className} />
}
