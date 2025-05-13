import React from 'react'
import Image from "next/image"
import PropertyListing from '@/components/PropertyListing'
const SingleProperty = () => {
  return (
    <section className="flex flex-col justify-center mt-28 ms-28 me-10 min-h-screen bg-gray-200  rounded-2xl px-8 py-12 mb-4" >
                    <div className="flex justify-between mb-14 text-black items-center px-10 ">
                        
                    </div>
                    <section id="property_listings" className="space-y-3.5">
                       <PropertyListing name="Reeve Road" serial="PR-001" address="10 Reeve Road, Ikoyi, Eti- Osa Local Government Area, Lagos State" percentage={20} />
                       <PropertyListing name="Christ Avenue" serial="PR-002" address="Plot 11 Block 7 Lekki Peninsula Scheme 1 Eti-osa, Lagos State" percentage={20} />
                       <PropertyListing name="Ikorodu Industrial" serial="PR-003" address="Plot 471 And 472 Ikorodu Industrial Layout, Ikorodu Area Of Lagos State" percentage={20} />
                       <PropertyListing name="Amuwo Odofin" serial="PR-004" address="Amuwo-odofin Area,along Badagry Express Way, Lagos State" percentage={20} />
                       <PropertyListing name="Amuwo Odofin" serial="PR-005" address="Amuwo-odofin Area,along Badagry Express Way, Lagos State" percentage={20} />
                    </section>
                </section>
  )
}

export default SingleProperty