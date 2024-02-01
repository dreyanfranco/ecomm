import SubmitButton from "@/components/SubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Product - Ecomm",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin?callbackUrl=/add-product");

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin?callbackUrl=/add-product");
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add product</h1>
      <form action={addProduct}>
        <input
          name="name"
          required
          type="text"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          name="imageUrl"
          required
          type="url"
          placeholder="Image URL"
          className="input input-bordered mb-3 w-full"
        />
        <input
          name="price"
          required
          type="number"
          placeholder="Price"
          className="input input-bordered mb-3 w-full"
        />
        <SubmitButton className="btn-block">Add Product</SubmitButton>
      </form>
    </div>
  );
}
