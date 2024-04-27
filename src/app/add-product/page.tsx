import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import FormSubmit from '@/components/FormSubmit';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import UploadProductImage from '@/components/UploadProductImage';

export const metadata = {
  title: 'Add product - NextMazon',
};

const addItems = async (formData: FormData) => {
  'use server';

  const session = getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product');
  }

  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price')) || 0;

  if (!name || !description || !imageUrl || !price) {
    throw new Error('Please fill all fields');
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });
  // create a loop that will create 100 products
  // for (let i = 0; i < 100; i++) {
  //   await prisma.product.create({
  //     data: { name, description, imageUrl, price },
  //   });
  // }

  redirect('/');
};

const AddProduct = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product');
  }else {
    redirect('/')
  }


  const formFields = [
    { name: 'name', placeholder: 'Product Name', type: 'text', mode: 1 },
    { name: 'description', placeholder: 'Product Description', type: 'text', mode: 2 },
    // { name: "imageUrl", placeholder: "Image URL", type: "url", mode: 1 },
    { name: 'price', placeholder: 'Product Price', type: 'number', mode: 1 },
  ];

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addItems}> 
        <UploadProductImage />

        {formFields.map((field, index) =>
          field.mode === 1 ? (
            <input
              key={index}
              className="input mb-3 w-full input-bordered"
              required
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
            />
          ) : (
            <textarea
              key={index}
              name={field.name}
              required
              placeholder={field.placeholder}
              className="textarea-bordered textarea w-full mb-3"
            />
          )
        )}
        <FormSubmit className="btn-block">Add Product</FormSubmit>
      </form>
    </div>
  );

  // return (
  //   <div>
  //     <h1 className="mb-3 text-lg font-bold"> AddProduct </h1>
  //     <form action={addItems}>
  //       <input
  //         className="input mb-3 w-full input-bordered"
  //         required
  //         name="name"
  //         placeholder="Product Name"
  //         type="text"
  //       />
  //       <textarea
  //         name="description"
  //         required
  //         placeholder="Product Description"
  //         className="textarea-bordered textarea w-full mb-3"
  //       />
  //       <input
  //         className="input mb-3 w-full input-bordered"
  //         required
  //         name="imageUrl"
  //         placeholder="imageUrl"
  //         type="url"
  //       />
  //       <input
  //         className="input mb-3 w-full input-bordered"
  //         required
  //         name="price"
  //         placeholder="Product Price"
  //         type="number"
  //       />
  //       <FormSubmit className="btn-block">Add Product</FormSubmit>
  //     </form>
  //   </div>
  // );
};

export default AddProduct;
