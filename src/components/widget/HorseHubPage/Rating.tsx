import starImg from '@/assets/images/HorseHubPage/Star.png';
import star_activeImg from '@/assets/images/HorseHubPage/Star_active.png';
import {forIn} from "lodash";

export default function Rating({value,className=''}) {
    const numbers = [1, 2, 3, 4, 5]
    return (
        <div className={'flex space-x-[0.08rem]'}>
            {
                numbers.map((item, index) => {
                    return (<div key={index} className={className}>
                        {
                            index < value ?
                                <img src={star_activeImg}  className={'w-[0.8rem] h-[0.8rem] object-cover'}/> :
                                <img src={starImg} className={'w-[0.8rem] h-[0.8rem] object-cover'}/>
                        }
                    </div>)
                })
            }
        </div>
    )
}
