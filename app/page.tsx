import React from 'react';
import { NavBar } from '@/components/Navigation/NavBar'
import { HeroSection } from '@/components/HeroSection';
import TokenSection from '@/components/TokenSection';
import ChainSection from '../components/ChainSection';
import Footer from '@/components/Footer';
import GridView from '@/components/GridView';
import { DataTable } from '@/components/Dashboard/ui/data-table';
import { ChainFilter } from '@/components/ChainFilter';
import { ChainTokenSearch } from '@/components/ChainTokenSearch';



export default function Home() {
  
  return (
    <main className='h-full w-full justify-center items-center flex flex-col bg-auto'>
        <div className='w-full flex md:mt-2'>
            <NavBar/>
          </div>

        <div className='justify-center items-center flex flex-col bg-none w-[1400px] gap-5'> 

          <div className='w-full h-full'>
            <HeroSection/>
          </div>

          <div className='justify-center items-center flex flex-col w-full h-full'>

              <div className='w-full h-full'>
                <ChainFilter/>
              </div>

            <div className='w-full h-full'>
              {/*<TokenSection/>*/}
            </div>

            <div className="w-full">
              {/*<ChainSection/>*/}
            </div>

          </div>

          <div className='w-full'>
            <DataTable />
          </div>

          <div className='w-full'>
            <GridView/>
          </div>

          <div className='w-full'>
            <Footer/>
          </div>

        </div> 
    </main>
  )
}
