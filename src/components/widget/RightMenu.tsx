import discord from '@/assets/svg/right_menu/Discord.svg';
import instagram from '@/assets/svg/right_menu/Group 103.svg';
import youtube from '@/assets/svg/right_menu/Subtract.svg';
import telegram from '@/assets/svg/right_menu/Telegram.svg';
import twitter from '@/assets/svg/right_menu/Twitter.svg';
import medium from '@/assets/svg/right_menu/Medium.svg'
export default function RightMenu() {
    return (

            <div
                className='w-[2.38rem] md:w-[3.75rem] right_menu_svg fixed bg-opacity-40 bg-black justify-center items-center right-0 top-32 flex flex-col flex-grow z-50 rounded-tl-[0.6rem] rounded-bl-[0.6rem]'>
                <img src={discord} className={'w-[1.25rem] h-[1.25rem] md:w-[1.5rem] md:h-[1.5rem]'} alt='' onClick={()=>{window.open('https://discord.com/invite/3pJPCskDP8')}}/>
                <img src={twitter} className={'w-[1.25rem] h-[1.25rem] md:w-[1.5rem] md:h-[1.5rem]'} alt='' onClick={()=>{window.open('https://twitter.com/omnihorse_NFT')}}/>
                <img src={telegram} className={'w-[1.25rem] h-[1.25rem] md:w-[1.5rem] md:h-[1.5rem]'} alt='' onClick={()=>{window.open('https://t.me/omnihorse')}}/>
                <img src={medium} className={'w-[1.25rem] h-[1.25rem] md:w-[1.5rem] md:h-[1.5rem]'} alt='' onClick={()=>{window.open('https://medium.com/@OmniHorse_NFT')}}/>
                <img src={youtube} className={'w-[1.25rem] h-[1.25rem] md:w-[1.5rem] md:h-[1.5rem]'} alt='' onClick={()=>{window.open('https://www.youtube.com/channel/UC_1Jp6Vfbdh_AwNfnU-pa8Q')}}/>
                <img src={instagram} className={'w-[1.25rem] h-[1.25rem] md:w-[1.5rem] md:h-[1.5rem]'} alt='' onClick={()=>{window.open('https://www.instagram.com/omnihorse/')}}/>
            </div>

    )
}

