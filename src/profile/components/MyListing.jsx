import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { db } from './../../../configs'
import { CarImages, CarListing } from './../../../configs/schema'
import { useUser } from '@clerk/clerk-react'
import CarItem from '@/components/CarItem'
import { eq, desc } from 'drizzle-orm'
import { FormatResult } from '@/components/Shared/Service';
import { FaTrashAlt } from 'react-icons/fa'


function MyListing() {
    const { user } = useUser();
    const [carList, setCarList] = useState([]);

    useEffect(() => {
        if (user) {
            GetUserCarListing();
        }
    }, [user]);

    const GetUserCarListing = async () => {
        if (!user?.primaryEmailAddress?.emailAddress) {
            console.error("User email is undefined");
            return;
        }
    
        try {
            console.log("Fetching listings for:", user.primaryEmailAddress.emailAddress);
    
            const result = await db
                .select()
                .from(CarListing)
                .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
                .where(eq(CarListing.createdBy, user.primaryEmailAddress.emailAddress)) // Use correct user email
                .orderBy(desc(CarListing.id))
                .execute();
    
            console.log("Fetched data:", result);
    
            const resp =FormatResult(result);
            console.log("Formatted data (resp):", resp);
            setCarList(resp);
        } catch (error) {
            console.error("Error fetching user listings:", error);
        }
    };
    

    return (
        <div className='mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-4xl'>My Listing</h2>
                <Link to={'/add-listing'}>
                    <Button>+ Add New Listing</Button>
                </Link>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-4'>
                {carList.map((item, index) => (
                    <div key={index}>
                        <CarItem car={item} />
                        <div className='p-2 bg-gray-50 flex justify-between gap-3'>
                              <Button variant='outline' className='w-full'>Edit</Button>
                              <Button variant='destructive'> <FaTrashAlt/> </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyListing;
