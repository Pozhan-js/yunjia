import {Collapse, ListItem, ListItemText} from "@mui/material";
import {useState} from "react";
import downArrowImg from '@/assets/images/Header/mobile/down_arrow.png';
import upArrowImg from '@/assets/images/Header/mobile/up_arrow.png';

export default function HeaderCollapse({item, onClick}) {
    const [open, setOpen] = useState(false);


    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItem disablePadding onClick={handleClick} className={'font-gtwalb text-white text-base py-[1.625rem]'}>
                {item.name}
                {open ? <img src={upArrowImg} className={'w-4 h-4 object-center ml-auto'}/> :
                    <img src={downArrowImg} className={'w-4 h-4 object-center ml-auto'}/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit={true}>
                {item.chilren.map((item_, index) => {
                    return (
                        <ListItem disablePadding key={index} onClick={()=>{onClick(item_.href,0)}}
                                  className={`font-gtwalb text-white text-base pl-4 ${index === 0 ? 'pb-4' : 'py-4'}`}>
                            {item_.name}
                        </ListItem>
                    )
                })}
            </Collapse>
        </>

    )
}

