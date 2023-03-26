import { getSession } from 'next-auth/react';
import Product from '../../../../../models/Product';
import db from '../../../../../utils/db';

async function handler(req, res) {
    const session = await getSession({ req });
    if (!session || (session && !session.user.isAdmin)) {
        return res.status(401).send('signin required');
    }

    const { user } = session;
    if (req.method === 'GET') {
        return getHandler(req, res, user);
    } else if (req.method === 'PUT') { 
        return putHandler(req, res, user);
    } else {
        res.status(400).send({message:  'Method not allowed'});
    }

}

async function getHandler(req, res) {
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.disconnect();
    res.send(product);
 }
async function putHandler(req, res) {
    await db.connect();
    const product = await Product.findById(req.query.id);
    if (product) {
        product.name = req.body.name;
        product.slug = req.body.slug;
        product.price = req.body.price;
        product.category = req.body.category;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        
        await product.save();
        await db.disconnect();
        res.send({ message: 'Product updated successfully' });
    } else {
        await db.disconnect();
        res.status(404).send({ message: "Method Not Allowed" });
    }
 }

export default handler;