import styled from "styled-components";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {isFunction} from "lodash";
import addImg from '@/assets/images/MintPage/add.png';
import subImg from '@/assets/images/MintPage/sub.png';

const NumberInput = ({className='', onChange}, ref) => {
    const [value, setValue] = useState(1);
    useEffect(() => {
        if (isFunction(onChange)) {
            onChange(value)
        }
    }, [value])
    const handleChange = (val) => {
        val === '0' ? val = '1' : '';
        val.length === 0 ? val = '1' : '';
        val.length > 2 ? val = '99' : '';
        val = val.replace(/[^\d]/g, '');
        setValue(parseInt(val));
    }
    useImperativeHandle(ref, () => ({
        value
    }))
    const operate = (type) => {
        if (type === 'sub' && value > 1) {
            setValue(value - 1)
        } else if (type === 'add' && value < 99) {
            setValue(value + 1)
        }
    }
    return (
        <Styled className={`flex items-center space-x-4 px-1 ${className}`}>
            <img src={subImg} className={'w-4 h-4 cursor-pointer'} onClick={() => {
                operate('sub')
            }}/>
            <input value={value}
                   className={'w-6 bg-transparent border-none text-white text-[1.25rem] font-gtwalm text-center text-[1.25rem] mt-[0.1rem] outline-none'}
                   onChange={(e) => {
                       handleChange(e.target.value);
                   }}/>
            <img src={addImg} className={'w-4 h-4 cursor-pointer'} onClick={() => {
                operate('add')
            }}/>
        </Styled>
    )
}
export default forwardRef(NumberInput)
const Styled = styled.div
    `
    `
