// pages/api/user/updateuserpricing.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ConnectDB } from '../../../config/db';
import { UserModel } from '../../../models/users';
import { DescPriceModel } from '../../../models/descprice';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await ConnectDB();

  const { method } = req;

  if (method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, priceId } = req.body;

    // Find the price entry by ID
    const price = await DescPriceModel.findOne({ _id: priceId });

    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }

    // Update the user's priceName field
    // const updatedUser = await UserModel.findByIdAndUpdate(
    //   userId,
    //   { priceName: priceId },
    //   { new: true }
    // ).populate('priceName');

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: email },  // Cari user berdasarkan email
      { priceName: priceId }, // Set priceName ke ObjectId dari DescPrice
      { new: true } // Mengembalikan data yang telah diperbarui
    ).populate('priceName');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);

  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Error updating user pricing', error: error.message });
    }
    return res.status(500).json({ message: 'Unknown error occurred' });
  }
}
