import React from 'react';

const NewsSection = () => {
    return (
        <div className='w-full h-full rounded-3xl bg-zinc-950 p-5 gap-5'>
            <div className="flex flex-col gap-4">
                <h1 className="font-bold ">
                    Headlines
                </h1>
                <div  className='h-[250px] w-full bg-zinc-900 rounded-2xl p-5 justify-end   flex flex-col gap-1' >
                        <h1 className='font-bold text-2xl text-start'>
                            Fed raises Interest Rates   
                        </h1>
                        <p className='font-normal text-start'>
                        how will this effect the crypto markets?
                    </p>
                </div>
                <div className=''>
                    <div className='bg-zinc-900 h-20 w-full'/>
                </div>
            </div>
        </div>
    );
}

export default NewsSection;
