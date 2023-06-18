import styled from 'styled-components';
import assets from '@/components/widget/HomePage/OurTeam/Assets'
import demoAvatar from '@/assets/images/demo/2@2x.png';

export default function OurTeam() {
    const arr = [
        {
            name: 'Albert Flores',
            avatar: demoAvatar,
            job: 'Founder & Business Strategy',
            facebook: '',
            linkedIn: ''
        },
        {
            name: 'Albert Flores',
            avatar: demoAvatar,
            job: 'Founder & Business Strategy',
            facebook: '',
            linkedIn: ''
        },
        {
            name: 'Albert Flores',
            avatar: demoAvatar,
            job: 'Founder & Business Strategy',
            facebook: '',
            linkedIn: true
        },
        {
            name: 'Albert Flores',
            avatar: demoAvatar,
            job: 'Founder & Business Strategy',
            facebook: '',
            linkedIn: ''
        }, {
            name: 'Albert Flores',
            avatar: demoAvatar,
            job: 'Founder & Business Strategy',
            facebook: true,
            linkedIn: true
        },
        {
            name: 'Albert Flores',
            avatar: demoAvatar,
            job: 'Founder & Business Strategy',
            facebook: '',
            linkedIn: ''
        },
        {
            name: 'Albert Flores',
            avatar: demoAvatar,
            job: 'Founder & Business Strategy',
            facebook: '',
            linkedIn: ''
        },
        {
            name: 'Albert Flores',
            avatar: demoAvatar,
            job: 'Founder & Business Strategy',
            facebook: true,
            linkedIn: ''
        },
    ]
    return (
        <Styled className={'relative flex flex-col items-center bg-no-repeat bg-cover pt-[5.5rem] bg-[#0C0C0D] pb-[10rem]'}>
            <img src={assets.titleImg} className={'w-[23.16rem] h-[5.81rem] title-img object-cover'}/>
            <div className={'mt-16'}>
                <div className={'grid grid-cols-4 gap-x-[5rem] gap-y-[2rem]'}>
                    {arr.map((item, index) => {
                        return (<div className={'flex flex-col items-center'} key={index}>
                            <img src={item.avatar} className={'w-[15.8rem] h-[14.63rem]'}/>
                            <div className={'name mt-[1.5rem] text-white'}>{item.name}</div>
                            <div className={'job mt-[0.38rem] text-white text-opacity-70'}>{item.job}</div>
                            <div className={'flex space-x-3 mt-3'}>
                                {item.linkedIn && <img src={assets.linkedinImg} className={'w-5 h-5'}/>}
                                {item.facebook && <img src={assets.facebookImg} className={'w-5 h-5'}/>}
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  .name {
    font-size: 1.13rem;
    font-weight: 800;
    line-height: 1.32rem;
  }

  .job {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.17rem;
    -webkit-background-clip: text;
  }
  
`;
