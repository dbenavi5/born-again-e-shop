import bcrypt from 'bcryptjs';

export const sliderItems = [
  {
    id: 1,
    img: "https://i.ibb.co/HXzfssQ/omoda-nl-lsa-XYTh-4g-Q-unsplash.jpg",
    title: "SUMMER SALE",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "f5fafd",
  },
  {
    id: 2,
    img: "https://i.ibb.co/K5wLKKy/khalid-boutchich.jpg",
    title: "AUTUMN COLLECTION",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "fcf1ed",
  },
  {
    id: 3,
    img: "https://i.ibb.co/MN4Wzz5/ussama-azam-xg-NSlx7-Dj-YM-unsplash.jpg",
    title: "LOUNGEWEAR LOVE",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "fbf0f4",
  },
];

export const users = [
  {
    name: "John",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345678"),
    isAdmin: true,
  },
  {
    name: "Jane",
    email: "user@example.com",
    password: bcrypt.hashSync("12345678"),
    isAdmin: false,
  },
  {
    name: "Diana",
    email: "diana@example.com",
    password: bcrypt.hashSync("12345678"),
    isAdmin: false,
  },
];

export const products = [
  {
    name: "Poplin Shirt",
    slug: "poplin-shirt",
    category: ["Shirts", 'men'],
    color: ["red","white","green","yellow","blue"],
    size:["M", "L", "S"],
    image: "/images/prada.png",
    price: 70,
    brand: "Prada",
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: "A popular shirt",
  },
  {
    name: "Lacoste Shirt",
    slug: "lacoste-shirt",
    category: ["plaid shirt", 'men'],
    color: ["beige","red","white"],
    size:["M", "L", "S"],
    image: "/images/shirt1.jpg",
    price: 70,
    brand: "Lacoste",
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: "A popular shirt",
  },
  {
    name: "Dress",
    slug: "dress",
    category: ["Dress", "women"],
    color: ["red","white","pink"],
    size:["M", "L", "S"],
    image: "/images/dress.png",
    price: 80,
    brand: "Adidas",
    rating: 3.2,
    numReviews: 10,
    countInStock: 20,
    description: "A popular dress",
  },
  {
    name: "Women Coat",
    slug: "women-coat",
    category: ["coat", "women"],
    color: ['brown', 'gray', "khaki"],
    size:["M", "L", "S"],
    image: "/images/women_coat.png",
    price: 90,
    brand: "J. Crew",
    rating: 4.5,
    numReviews: 3,
    countInStock: 20,
    description: "A popular coat"
  },
  {
    name: "Golf Pants",
    slug: "golf-pants",
    category: ["Pants", 'men', 'Golf Pants'],
    color: ["brown",'white', 'black','gray'],
    size:["M", "L", "S"],
    image: "/images/pants1.jpg",
    price: 90,
    brand: "Oliver",
    rating: 2.9,
    numReviews: 13,
    countInStock: 20,
    description: "Smart looking pants",
  },
  {
    name: "Fit Pants",
    slug: "fit-pants",
    category: ["Pants", 'men', 'Golf Pants'],
    color: ["brown",'white', 'black','gray'],
    size:["M", "L", "S"],
    image: "/images/pants2.jpg",
    price: 95,
    brand: "Zara",
    rating: 3.5,
    numReviews: 7,
    countInStock: 20,
    description: "A popular pants",
  },
  {
    name: "Classic Pants",
    slug: "classic-pants",
    category: ["Pants",'men', 'Golf Pants'],
    color: ["brown",'white', 'black','gray'],
    size:["M", "L", "S"],
    image: "/images/pants3.jpeg",
    price: 75,
    brand: "Casely",
    rating: 2.4,
    numReviews: 14,
    countInStock: 20,
    description: "A popular pants",
  },
];
