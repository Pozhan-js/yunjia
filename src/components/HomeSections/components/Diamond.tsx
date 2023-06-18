export default function Diamond({
                                    size,
                                    className = '',
                                    fill = '#422D90',
                                    stroke = '#6F4BE1',
                                    edgColor = '#6F4BE1',
                                    activate = false,
                                    item = null,
                                    strokeWidth=6
                                }) {
    return (
        <div className={'flex items-center justify-center relative ' + className}>
            <svg className={`${activate ? 'animate__animated animate__flipInY' : ''}`} width={size} height={size}
                 viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M133.268 15.0577L176.536 90L133.268 164.942L46.7321 164.942L3.46412 90L46.7321 15.0577L133.268 15.0577Z"
                    fill={fill} stroke={stroke} strokeWidth={strokeWidth}/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M176.536 89.9999L133.268 15.0576L46.7321 15.0576L3.46412 89.9999L46.7321 164.942L133.268 164.942L176.536 89.9999ZM135 167.942L180 89.9999L135 12.0576L45 12.0576L1.18518e-05 89.9999L45 167.942L135 167.942Z"
                      fill={edgColor}/>
            </svg>

            <img src={item?.img} onClick={() => {
                window.open(item?.external_href);
            }} className={'absolute object-center object-cover w-[60%] h-[60%] cursor-pointer'} hidden={!item?.img}/>
        </div>
    )
}
