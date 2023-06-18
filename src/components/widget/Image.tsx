import {useState} from "react";
import imageErrImg from '@/assets/images/image_err.png';
import imageLoadImg from '@/assets/images/image_loading.png';
import {useMount} from "ahooks";
import {isNil} from "lodash";
import LazyLoad from 'react-lazyload';

const PlaceHolder = ({className}) => {
    return (
        <span className={'flex items-center justify-center ' + className}>
                                       <img src={imageLoadImg} className={'w-16 h-16 object-center'} alt={''}/>
                                   </span>
    )
}
export default function Image({className='', src, onClick = null}) {
    const [error, setError] = useState(false);
    useMount(() => {
        // console.log(onClick)
        if (isNil(src)) {
            setError(true)
        }
    })

    return (
        <div className={'flex-shrink-0 lazyLoad-box'}>
            {error ? <div className={'flex items-center justify-center ' + className}>
                    <img src={imageErrImg} className={'w-16 h-16 object-center'} alt={''}/>
                </div> :
                <LazyLoad once debounce={500} src={src} 
                          placeholder={
                              <PlaceHolder className={className}/>
                          }
                          onError={() => {
                              setError(true)
                          }} alt={''}>
                    <img src={src} className={className} onClick={onClick}/>
                </LazyLoad>
            }
        </div>

    )
}


