'use client'
import React from 'react'
import Image from "next/image"
import PropertyListing from '@/components/PropertyListing'
import { useSearchParams } from 'next/navigation';
import PropertyDetails from '@/components/PropertyDetails';
import { Suspense } from 'react'


const Properties = () => {
    const searchParams = useSearchParams();
    const propertyId = searchParams.get("property");
  return (
    <section className="" >
              {
          propertyId ? (
            <Suspense>
              <PropertyDetails id={propertyId} />
            </Suspense>
          ) : (
            <PropertyListing />
          )
        }
    </section>
  )
}

export default Properties