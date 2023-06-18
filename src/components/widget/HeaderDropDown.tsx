import {useState} from "react";
import {Dropdown, Menu} from "antd";
import {useNavigate} from "react-router-dom";
import {useMount} from "ahooks";
import styled from 'styled-components';
import '@/assets/styles/antd/Dropdown/index.css';
import down_arrow from '@/assets/images/Header/down_arrow.png';
export default function HeaderDropDown({item}) {
    const [menu, setMenu] = useState(<></>);
    // const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    useMount(() => {
        let items = []
        // console.log(item)
        item.chilren.forEach((o, index) => {
            items.push({
                key: index, label: (<div onClick={() => navigate(o.href)}
                                         className={'font-ggr font-bold text-base text-white bg-clip-text ant-dropdown-menu-item-active'}>
                    {o.name}
                </div>),
            })
        })
        const menu_ = (<Menu
            className={'bg-[#343438]'}
            items={items}
        />);
        // console.log(menu_)
        setMenu(menu_)
    })
    return (<Styled>
        <Dropdown overlay={menu} placement="bottomLeft" overlayStyle={{minWidth: '8rem'}}>
            <div className={'flex items-center'}>
                <a onClick={() => {
                    if (item.href === '/market') return;
                    navigate(item.href)
                }}
                   className={`font-gtwalm text-white text-base flex items-center transition duration-150 ease-in-out`}>{item.name}
                    <img src={down_arrow} className={'w-4 h-4'}/>
                </a>
            </div>
        </Dropdown>
    </Styled>)
}

const Styled = styled.div`
`;
