import { NextApiRequest, NextApiResponse } from 'next';
import { ConnectDB } from '../../../config/db';
import { DescPriceModel } from '../../../models/descprice';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await ConnectDB();

  const { method } = req;


  switch (method) {

    case 'POST':

      try {
        const newItem = { id: Date.now(), ...req.body };

        const newPrice = await DescPriceModel.create(newItem);
        console.log("CREATE : ", newPrice)

        res.status(201).json(newPrice);
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(400).json({ message: 'Error adding pricing', error: error.message });
        } else {
          res.status(400).json({ message: 'Unknown error occurred' });
        }
      }
      break;

    // case 'GET':
    //   try {
    //     const prices = await DescPriceModel.find();
    //     res.status(200).json(prices);
    //   } catch (error: unknown) {
    //     if (error instanceof Error) {
    //       res.status(400).json({ message: 'Error fetching pricing', error: error.message });
    //     } else {
    //       res.status(400).json({ message: 'Unknown error occurred' });
    //     }
    //   }
    //   break;

    case 'PUT':
      try {
        const { id } = req.query;
        const updatedPrice = await DescPriceModel.findByIdAndUpdate(
          { _id: id },
          { ...req.body },
          { new: true }
        );
        if (!updatedPrice) {
          res.status(404).json({ message: 'Pricing not found' });
        } else {
          res.status(200).json(updatedPrice);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(400).json({ message: 'Error updating pricing', error: error.message });
        } else {
          res.status(400).json({ message: 'Unknown error occurred' });
        }
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        const deletedPrice = await DescPriceModel.findByIdAndDelete({ _id: id });
        if (!deletedPrice) {
          res.status(404).json({ message: 'Pricing not found' });
        } else {
          res.status(200).json({ message: 'Pricing deleted successfully' });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(400).json({ message: 'Error deleting pricing', error: error.message });
        } else {
          res.status(400).json({ message: 'Unknown error occurred' });
        }
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}
