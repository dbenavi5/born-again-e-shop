/* eslint-disable no-unused-vars */
import db from '../../utils/db';
import User from '../../models/User';
import Product from '../../models/Product';
import { users, products } from "../../utils/data";

const handler = async(req, res) => {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(users);
    await Product.deleteMany();
    await Product.insertMany(products);
    await db.disconnect();

    res.send({message: 'seeded successfully'})
}

export default handler;