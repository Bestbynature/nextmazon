import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo-no-background.png';
import { redirect } from 'next/navigation';
import { getCart } from '@/lib/db/cart';
import ShoppingCartButton from './ShoppingCartButton';
import UserMenuButton from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

const searchProducts = async (formData: FormData) => {
  'use server';

  const searchQuery = formData.get('searchQuery') as string;

  if (searchQuery) {
    // redirect(`/search/${searchQuery}`)
    redirect('/search?query=' + searchQuery);
  }
};

const Navbar = async () => {

  const session = await getServerSession(authOptions);

  const cart = await getCart();

  return (
    <div className="bg-base-300">
      <div className="navbar  max-w-[80%] min-w-[300px] m-auto, flex-col sm:flex-row gap-2">
        <div className="flex-1 ">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} alt="Nextmazon Logo" width={50} height={50} title="NextMazon Logo" />
            NextMazon
          </Link>
        </div>

        <div>
          <Link href="/" className="btn btn-ghost">
            Products
          </Link>
          <Link href="/cart" className="btn btn-ghost">
            Cart
          </Link>
          <Link href="/add-product" className="btn btn-ghost">
            Add Product
          </Link>
        </div>

        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
