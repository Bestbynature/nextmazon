import React from 'react';

const AddProduct = () => {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold"> AddProduct </h1>
      <form>
        <input
          className="input mb-3 w-full  input-bordered"
          required
          name="name"
          placeholder="Name"
          type="text"
        />
      </form>
    </div>
  );
};

export default AddProduct;
