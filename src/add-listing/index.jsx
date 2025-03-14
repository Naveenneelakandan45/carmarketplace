import Header from '@/components/Header'
import React, { useState } from 'react'
import carDetails from './../components/Shared/carDetails.json'
import InputField from './components/InputField'
import DropdownField from './components/DropdownField'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import features from './../components/Shared/features.json'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { db } from './../../configs'
import { CarListing, CarImages } from './../../configs/schema'
import IconField from './components/IconField'
import UploadImages from './components/UploadImages'
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import moment from 'moment';
import { Toaster } from 'react-hot-toast' // ✅ Corrected import

function AddListing() {
  const [formData, setFormData] = useState({ images: [] });
  const [featuresData, setFeaturesData] = useState({});
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (!user?.primaryEmailAddress?.emailAddress) {
        console.error("User email is undefined");
        setLoader(false);
        return;
    }

    try {
        console.log("Creating listing for:", user.primaryEmailAddress.emailAddress);

        const result = await db.insert(CarListing).values({
            ...formData,
            features: JSON.stringify(featuresData),
            createdBy: user.primaryEmailAddress.emailAddress, // Ensure the correct user email is stored
            postedOn: moment().format('DD/MM/yyyy'),
        }).returning({ id: CarListing.id }).execute();

        if (result.length > 0) {
            const newCarListingId = result[0].id;

            // Insert all images into CarImages table
            await Promise.all(
                formData.images.map(async (imageUrl) => {
                    await db.insert(CarImages).values({
                        imageUrl,
                        carListingId: newCarListingId
                    }).execute();
                })
            );

            console.log("Images saved successfully.");
            navigate('/profile'); // Redirect to profile page after adding a listing
        }
    } catch (e) {
        console.error("Error saving car listing:", e);
    } finally {
        setLoader(false);
    }
};


  return (
    <div>
      <Header />
      <Toaster /> {/* ✅ Moved inside JSX */}
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10" onSubmit={onSubmit}>
          <h2 className="font-medium text-xl mb-6">Car Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {carDetails.carDetails.map((item, index) => (
              <div key={index}>
                <label className="text-sm flex gap-2 items-center mb-1">
                  <IconField icon={item?.icon} />
                  {item?.label} {item.required && <span className="text-red-600">*</span>}
                </label>
                {item.fieldType === "text" || item.fieldType === "number" ? (
                  <InputField item={item} handleInputChange={handleInputChange} />
                ) : item.fieldType === "dropdown" ? (
                  <DropdownField item={item} handleInputChange={handleInputChange} />
                ) : item.fieldType === "textarea" ? (
                  <Textarea onChange={(e) => handleInputChange(item.name, e.target.value)} required={item?.required} />
                ) : null}
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <h2 className="font-medium text-xl my-6">Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {features.features.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Checkbox onCheckedChange={(value) => handleFeatureChange(item.name, value)} />
                <h2>{item.label}</h2>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <UploadImages setFormData={setFormData} setLoader={setLoader} />

          <div className="mt-10 flex justify-end">
            <Button type="submit">{!loader ? "Submit" : <BiLoaderAlt className='animate-spin text-lg' />}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
