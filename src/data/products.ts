import womensjewellerytopsone from "../assets/products/tops/womens-jewellery-tops-1.jpeg";
import womensjewellerytopstwo from "../assets/products/tops/womens-jewellery-tops-2.jpeg";
import womensjewellerytopsthree from "../assets/products/tops/womens-jewellery-tops-3.jpeg";
import womensjewellerytopsfour from "../assets/products/tops/womens-jewellery-tops-4.jpeg";
import womensjewellerytopsfive from "../assets/products/tops/womens-jewellery-tops-5.jpeg";
import womensjewellerytopssix from "../assets/products/tops/womens-jewellery-tops-6.jpeg";
import womensjewellerytopsseven from "../assets/products/tops/womens-jewellery-tops-7.jpeg";


// bangles
import womensbanglesone from "../assets/products/bangles/Bangle1-1.jpeg";
import womensbanglestwo from "../assets/products/bangles/Bangle1-2.jpeg";
import womensbanglesthree from "../assets/products/bangles/Bangle2-1.jpeg";
import womensbanglesfour from "../assets/products/bangles/Bangle2-2.jpeg";
import womensbanglesfive from "../assets/products/bangles/Bangle3-1.jpeg";
import womensbanglessix from "../assets/products/bangles/Bnagle3-2.jpeg";


// Earrings
import womensearringsone from "../assets/products/earrings/earrings1-1.jpeg";
import womensearringstwo from "../assets/products/earrings/earrings1-2.jpeg";
import womensearringsthree from "../assets/products/earrings/earrings2-1.jpeg";
import womensearringsfour from "../assets/products/earrings/earrings2-2.jpeg";
import womensearringsfive from "../assets/products/earrings/earrings3-1.jpeg";
import womensearringssix from "../assets/products/earrings/earrigs4-1.jpeg";



// Necklaces
import womennecklaceone from "../assets/products/necklace/necklace1-1.jpeg";
import womennecklacetwo from "../assets/products/necklace/necklace2-1.jpeg";
import womennecklacethree from "../assets/products/necklace/necklace3-1.jpeg";
import womennecklacefour from "../assets/products/necklace/necklace4-1.jpeg";
import womennecklacefive from "../assets/products/necklace/necklace5-1.jpeg";
import womennecklacesix from "../assets/products/necklace/necklace6-1.jpeg";
import womennecklaceseven from "../assets/products/necklace/necklace7-1.jpeg";


// Bracelets
import womenbraceletsone from "../assets/products/bracelets/bracelet1-1.jpeg";
import womenbraceletstwo from "../assets/products/bracelets/bracelet1-2.jpeg" 

// Chains
import womenchainsone from "../assets/products/chains/chain1-1.jpeg";
import womenchainstwo from "../assets/products/chains/chain2-1.jpeg";
import womenchainsthree from "../assets/products/chains/chain3-2.jpeg";


// Pendants
import womenpendantsone from "../assets/products/pendants/statue1-1.jpeg";
import womenpendantstwo from "../assets/products/pendants/statues3-1.jpeg";


// Waist Belt
import womenwaistbeltone from "../assets/products/waistbelt/waistbelt1-1.jpeg"; 
import womenwaistbelttwo from "../assets/products/waistbelt/waistbelt1-2.jpeg"; 

export interface Product {
  priceRange: any;
  variants: any;
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const products: Product[] = [
 {
     id: "1",
     title: "Nirva Emerald dewdrops",
     price: 27786.5,
     image: womensjewellerytopsone,
     category: "tops",
     description: "elegant emerald teardrops framed by brilliant sparkle.",
     priceRange: undefined,
     variants: undefined
 },
  {
      id: "2",
      title: "Nirva Ruby Dewdrops",
      price: 25347,
      image: womensjewellerytopstwo,
      category: "tops",
      description: "Elegant ruby teardrops with radiant sparkle.",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "3",
      title: "Nirva Emerald Bloom Studs",
      price: 17731,
      image: womensjewellerytopsthree,
      category: "tops",
      description: "Graceful emerald sparkle in a timeless stud design.",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "4",
      title: "Nirva Ruby Tree Studs",
      price: 16422,
      image: womensjewellerytopsfour,
      category: "tops",
      description: "Delicate floral-inspired studs with radiant ruby stones and brilliant sparkle.",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "5",
      title: "Nirva Halo Circle Earrings",
      price: 10019.8,
      image: womensjewellerytopsfive,
      category: "tops",
      description: "Elegant circular earrings with a sparkling halo design and brilliant stone accents for everyday sophistication.",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "6",
      title: "Nirva Regal Cone Drops",
      price: 31832.5,
      image: womensjewellerytopssix,
      category: "tops",
      description: "Bold cone-shaped earrings with layered sparkle detailing, crafted to make every occasion shine.",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "7",
      title: "Nirva Emerald Star Studs",
      price: 15470,
      image: womensjewellerytopsseven,
      category: "tops",
      description: "Elegant circular studs featuring a radiant emerald center surrounded by sparkling stones for a timeless look.",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "8",
      title: "Womens Bangles",
      price: 15470,
      image: womensbanglesone,
      category: "bangles",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
   {
      id: "9",
      title: "Womens Bangles",
      price: 15470,
      image: womensbanglestwo,
      category: "bangles",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "10",
      title: "Womens Bangles",
      price: 15470,
      image: womensbanglesthree,
      category: "bangles",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "11",
      title: "Womens Bangles",
      price: 15470,
      image: womensbanglesfour,
      category: "bangles",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "11",
      title: "Womens Bangles",
      price: 15470,
      image: womensbanglesfive,
      category: "bangles",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "12",
      title: "Womens Bangles",
      price: 15470,
      image: womensbanglessix,
      category: "bangles",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "13",
      title: "Womens Earrings",
      price: 15470,
      image: womensearringsone,
      category: "earrings",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "14",
      title: "Womens Earrings",
      price: 15470,
      image: womensearringstwo,
      category: "earrings",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "15",
      title: "Womens Earrings",
      price: 15470,
      image: womensearringsthree,
      category: "earrings",
      description: "",
      priceRange: undefined,
      variants: undefined
  },

  {
      id: "16",
      title: "Womens Earrings",
      price: 15470,
      image: womensearringsfour,
      category: "earrings",
      description: "",
      priceRange: undefined,
      variants: undefined
  },

  {
      id: "17",
      title: "Womens Earrings",
      price: 15470,
      image: womensearringsfive,
      category: "earrings",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
   {
      id: "18",
      title: "Womens Earrings",
      price: 15470,
      image: womensearringssix,
      category: "earrings",
      description: "",
      priceRange: undefined,
      variants: undefined
  },

  {
      id: "19",
      title: "Womens Necklaces",
      price: 15470,
      image: womennecklaceone,
      category: "necklaces",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
   {
      id: "20",
      title: "Womens Necklaces",
      price: 15470,
      image: womennecklacetwo,
      category: "necklaces",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "21",
      title: "Womens Necklaces",
      price: 15470,
      image: womennecklacethree,
      category: "necklaces",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "21",
      title: "Womens Necklaces",
      price: 15470,
      image: womennecklacefour,
      category: "necklaces",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "21",
      title: "Womens Necklaces",
      price: 15470,
      image: womennecklacefive,
      category: "necklaces",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "22",
      title: "Womens Necklaces",
      price: 15470,
      image: womennecklacesix,
      category: "necklaces",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
   {
      id: "23",
      title: "Womens Necklaces",
      price: 15470,
      image: womennecklaceseven,
      category: "necklaces",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "24",
      title: "Bracelets",
      price: 15470,
      image: womenbraceletsone,
      category: "bracelets",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  {
      id: "25",
      title: "Bracelets",
      price: 15470,
      image: womenbraceletstwo,
      category: "bracelets",
      description: "",
      priceRange: undefined,
      variants: undefined
  },

  {
      id: "26",
      title: "Chains",
      price: 15470,
      image: womenchainsone,
      category: "chains",
      description: "",
      priceRange: undefined,
      variants: undefined
  },

  {
      id: "27",
      title: "Chains",
      price: 15470,
      image: womenchainstwo,
      category: "chains",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
  
  {
      id: "28",
      title: "Chains",
      price: 15470,
      image: womenchainsthree,
      category: "chains",
      description: "",
      priceRange: undefined,
      variants: undefined
  },

  {
      id: "29",
      title: "Pendants",
      price: 15470,
      image: womenpendantsone,
      category: "pendants",
      description: "",
      priceRange: undefined,
      variants: undefined
  },

  {
      id: "30",
      title: "Pendants",
      price: 15470,
      image: womenpendantstwo,
      category: "pendants",
      description: "",
      priceRange: undefined,
      variants: undefined
  },

    {
      id: "31",
      title: "Waist Belt",
      price: 15470,
      image: womenwaistbeltone,
      category: "waistbelt",
      description: "",
      priceRange: undefined,
      variants: undefined
  },

   {
      id: "32",
      title: "Waist Belt",
      price: 15470,
      image: womenwaistbelttwo,
      category: "waistbelt",
      description: "",
      priceRange: undefined,
      variants: undefined
  },
];