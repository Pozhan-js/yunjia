import styled from 'styled-components';
import lastpoolImg from '@/assets/images/HomePage/Banner/lastpool@2x.png';
import poolImg from '@/assets/images/HomePage/Banner/pool@2x.png';
import _ from 'lodash';

export default function PoolNotes({lastpool, totalpool}) {
    // console.log(last_pool, pool)
    lastpool = _.padStart(lastpool, 4, '0');
    totalpool = _.padStart(totalpool, 6, '0');
    return (
        <PoolNotesStyled>
            <div className={'flex items-center text-white'}>
                <img className={'object-cover w-10 h-10 mr-2'} src={lastpoolImg} alt=''/>
                <p>Last Pool:</p>
                <div className="ml-1 flex space-x-1">
                    {lastpool && lastpool?.split('').map((v, index) => {
                        return (
                            <div className="flex-1 box font-medium flex items-center justify-center text-sm"
                                 key={index}>{v}</div>);
                    })}
                </div>

                <img className={'ml-14 object-cover w-10 h-10 mr-2'} src={poolImg} alt=''/>
                <p>Pool:</p>
                <div className="ml-1 flex space-x-1">
                    {totalpool && totalpool?.split('').map((v, index) => {
                        return (
                            <div className="flex-1 box font-medium flex items-center justify-center text-sm"
                                 key={index}>{v}</div>);
                    })}
                </div>
            </div>
        </PoolNotesStyled>
    )
}

const PoolNotesStyled = styled.div`
  position: absolute;
  top: 5rem;
  right: 5%;

  .box {
    width: 1.31rem;
    height: 1.31rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 0.22rem 0.22rem 0.22rem 0.22rem;
    opacity: 1;
  }

`;
