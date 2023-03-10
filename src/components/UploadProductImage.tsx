'use client';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { set } from 'zod';

const UploadProductImage = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const [imagePreview, setImagePreview] = useState<string>(''); // [1

  const fileRef = useRef<HTMLInputElement>(null);

  const getPublicFileUrl = (filePath: string) => {
    const { data} = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

      setImageUrl(data.publicUrl);
  }


  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imagePreview = URL.createObjectURL(file);
    setImagePreview(imagePreview);

    const fileName = `${uuidv4()}-${file.name}`;

    const { data, error} = await supabase.storage
    .from('project-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/png' || 'image/jpeg' || 'image/jpg',
    });

    if (error) {
      console.log(error);
      return;
    }

    const filePath = data.path;

    getPublicFileUrl(filePath);
  }

  const handleFileSelect = () => {
    fileRef.current?.click();
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setImagePreview('')
  };

  return (
    <>
    <div className='flex flex-col sm:flex-row gap-3 border border-double mb-3 rounded-md'>
      <button className="btn btn-accent" type="button" onClick={handleFileSelect}>
        Upload Product image
      </button>
      {imagePreview && 
        <Image src={imagePreview} alt="Product Image" className="rounded-full" width={40} height={40} />}
      </div>
      <input
        type="text"
        name="imageUrl"
        placeholder="Use the button above to automatically create the Image url"
        className="mb-3 w-full input input-bordered"
        value={imageUrl || ''}
        onChange={handleImageUrlChange}
      />
      <input type="file" name="pictureFile" hidden ref={fileRef} onChange={handleUpload}/>
    </>
  );
};

export default UploadProductImage;
