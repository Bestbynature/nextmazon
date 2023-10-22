import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '@/firebase';
import FormSubmit from '@/components/FormSubmit';

export const metadata = {
  title: 'Add product - NextMazon',
};

const addItems = async (formData: FormData) => {
  "use server";

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

  // const docRef = await addDoc(collection(db, 'products'), {
  //   name,
  //   description,
  //   imageUrl,
  //   price,
  // });

  // console.log('Document written with ID: ', docRef.id);
  redirect('/');
}



// const addproduct = async (formData: FormData) => {
//   "use server";

//   const name = formData.get('name')?.toString();
//   const description = formData.get('description')?.toString();
//   const imageUrl = formData.get('imageUrl')?.toString();
//   const price = Number(formData.get('price')) || 0;

//   if (!name || !description || !imageUrl || !price) {
//     throw new Error('Please fill all fields');
//   }

//   console.log({ name, description, imageUrl, price })

//   await prisma.product.create({
//     data: { name, description, imageUrl, price },
//   });

//   redirect('/');
// };

const AddProduct = () => {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold"> AddProduct </h1>
      <form action={addItems}>
        <input
          className="input mb-3 w-full input-bordered"
          required
          name="name"
          placeholder="Product Name"
          type="text"
        />
        <textarea
          name="description"
          required
          placeholder="Product Description"
          className="textarea-bordered textarea w-full mb-3"
        />
        <input
          className="input mb-3 w-full input-bordered"
          required
          name="imageUrl"
          placeholder="imageUrl"
          type="url"
        />
        <input
          className="input mb-3 w-full input-bordered"
          required
          name="price"
          placeholder="Product Price"
          type="number"
        />
        <FormSubmit className='btn-block' >
          Add Product
        </FormSubmit>
      </form>
    </div>
  );
};

export default AddProduct;
