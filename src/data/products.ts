// Tops
import womensjewellerytopsone from "../assets/products/tops/womens-jewellery-tops-1.jpeg";
import womensjewellerytopstwo from "../assets/products/tops/womens-jewellery-tops-2.jpeg";
import womensjewellerytopsthree from "../assets/products/tops/womens-jewellery-tops-3.jpeg";
import womensjewellerytopsfour from "../assets/products/tops/womens-jewellery-tops-4.jpeg";
import womensjewellerytopsfive from "../assets/products/tops/womens-jewellery-tops-5.jpeg";
import womensjewellerytopssix from "../assets/products/tops/womens-jewellery-tops-6.jpeg";
import womensjewellerytopsseven from "../assets/products/tops/womens-jewellery-tops-7.jpeg";
import womensjewellerytopseight from "../assets/products/tops/womens-jewellery-tops-8.jpeg";
import womensjewellerytopsnine from "../assets/products/tops/womens-jewellery-tops-9.jpeg";

// Bangles
import regalvinegoldbanglesset1 from "../assets/products/bangles/regal-vine-gold-bangles-set-1.jpeg";
import womensbanglestwo from "../assets/products/bangles/Bangle1-2.jpeg";
import womensbanglesthree from "../assets/products/bangles/Bangle2-1.jpeg";
import womensbanglesfour from "../assets/products/bangles/Bangle2-2.jpeg";
import womensbanglesfive from "../assets/products/bangles/Bangle3-1.jpeg";
import womensbanglessix from "../assets/products/bangles/Bnagle3-2.jpeg";

// Earrings
import womensearringstwo from "../assets/products/earrings/earrings1-2.jpeg";
import womensearringsthree from "../assets/products/earrings/earrings2-1.jpeg";
import womensearringsfour from "../assets/products/earrings/earrings2-2.jpeg";
import womensearringsfive from "../assets/products/earrings/earrings3-1.jpeg";
import womensearringssix from "../assets/products/earrings/earrigs4-1.jpeg";

// Necklaces
import emeraldmajestynecklaceset1 from "../assets/products/necklace/emerald-majesty-necklace-set-1.jpeg";
import emeraldmajestynecklaceset2 from "../assets/products/necklace/emerald-majesty-necklace-set-1.jpeg";

import crystalelephantparadenecklacset1 from "../assets/products/necklace/crystal-elephant-parade-necklac-set-1.jpeg";
import crystalelephantparadenecklacset2 from "../assets/products/necklace/crystal-elephant-parade-necklac-set-2.jpeg";

import royalelephantcharmnecklaceset1 from "../assets/products/necklace/royal-elephant-charm-necklace-set-1.jpeg";
import royalelephantcharmnecklaceset2 from "../assets/products/necklace/royal-elephant-charm-necklace-set-2.jpeg";
import womennecklacefour from "../assets/products/necklace/necklace4-1.jpeg";
import emeraldroyaleheritagenecklaceset1 from "../assets/products/necklace/emerald-royale-heritage-necklace-set-1.jpeg";
import womennecklacesix from "../assets/products/necklace/necklace6-1.jpeg";
import radiancewhitestonenecklaceset1 from "../assets/products/necklace/radiance-white-stone-necklace-set-1.jpeg";

// Bracelets
import womenbraceletsone from "../assets/products/bracelets/bracelet1-1.jpeg";
import womenbraceletstwo from "../assets/products/bracelets/bracelet1-2.jpeg";

// Chains
import womenchainsone from "../assets/products/chains/chain1-1.jpeg";
import womenchainstwo from "../assets/products/chains/chain2-1.jpeg";
import womenchainsthree from "../assets/products/chains/chain3-2.jpeg";

// Pendants
import tirumalabalajidivinependantset1 from "../assets/products/pendants/tirumala-balaji-divine-pendant-set-1.jpeg";
import hanumangadadivinependantset2 from "../assets/products/pendants/hanuman-gada-divine-pendant-set-2.jpeg";

// Waist Belt
import womenwaistbeltone from "../assets/products/waistbelt/waistbelt1-1.jpeg"; 
import womenwaistbelttwo from "../assets/products/waistbelt/waistbelt1-2.jpeg"; 

export interface Product {
  featured: unknown;
  id: string;
  slug: string;
  sku: string;
  images: string[];

  // Strict mapping matching the exact options from the screenshot
  mainCategory: string;
  subCategory: string;
  productName: string;
  productDescription: string;
  productImage: string;

  goldColor: string;
  goldPurity: string;
  grossWeight: number;
  stoneWeight: number;
  netWeight: number;
  goldRate: number;
  stoneInCarat: number;
  perCtCost: number;
  stoneCost: number;
  goldPrice: number;

  makingCharges: number;
  makingDiscountPercent: number;
  discountAmount: number;
  makingChargesAfterDiscount: number;
  totalAmount: number;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "nirva-emerald-dewdrops",
    sku: "NIR-TOP-001",
    images: [womensjewellerytopsone, womensjewellerytopstwo, womensjewellerytopsthree],

    mainCategory: "Women's Jewellery",
    subCategory: "Tops",
    productName: "Nirva Emerald dewdrops",
    productDescription: "Elegant emerald dewdrops tops crafted in premium gold.",
    productImage: womensjewellerytopsone,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 5.21,
    stoneWeight: 0.54,
    netWeight: 4.67,
    goldRate: 5950,
    stoneInCarat: 2.7,
    perCtCost: 2200,
    stoneCost: 5940,
    goldPrice: 27786.5,

    makingCharges: 15411,
    makingDiscountPercent: 22,
    discountAmount: 3390.42,
    makingChargesAfterDiscount: 12020.58,
    totalAmount: 45747,
  },
  {
    id: "2",
    slug: "nirva-ruby-dewdrops",
    sku: "NIR-TOP-002",
    images: [womensjewellerytopstwo],

    mainCategory: "Women's Jewellery",
    subCategory: "Tops",
    productName: "Nirva Ruby Dewdrops",
    productDescription: "Elegant ruby dewdrops tops designed for graceful charm.",
    productImage: womensjewellerytopstwo,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 5.45,
    stoneWeight: 1.19,
    netWeight: 4.26,
    goldRate: 5950,
    stoneInCarat: 5.95,
    perCtCost: 2200,
    stoneCost: 13090,
    goldPrice: 25347,

    makingCharges: 14058,
    makingDiscountPercent: 22,
    discountAmount: 3092.76,
    makingChargesAfterDiscount: 10965.24,
    totalAmount: 49402,
  },
  {
    id: "3",
    slug: "nirva-emerald-bloom-studs",
    sku: "NIR-TOP-003",
    images: [womensjewellerytopsthree],

    mainCategory: "Women's Jewellery",
    subCategory: "Tops",
    productName: "Nirva Emerald Bloom Studs",
    productDescription: "Graceful emerald bloom studs with delicate setting.",
    productImage: womensjewellerytopsthree,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 3.53,
    stoneWeight: 0.55,
    netWeight: 2.98,
    goldRate: 5950,
    stoneInCarat: 2.75,
    perCtCost: 2200,
    stoneCost: 6050,
    goldPrice: 17731,

    makingCharges: 9834,
    makingDiscountPercent: 22,
    discountAmount: 2163.48,
    makingChargesAfterDiscount: 7670.52,
    totalAmount: 31452,
  },
  {
    id: "4",
    slug: "nirva-ruby-tree-studs",
    sku: "NIR-TOP-004",
    images: [womensjewellerytopsfour],

    mainCategory: "Women's Jewellery",
    subCategory: "Tops",
    productName: "Nirva Ruby Tree Studs",
    productDescription: "Delicate ruby tree studs crafted for everyday beauty.",
    productImage: womensjewellerytopsfour,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 3.33,
    stoneWeight: 0.57,
    netWeight: 2.76,
    goldRate: 5950,
    stoneInCarat: 2.85,
    perCtCost: 2200,
    stoneCost: 6270,
    goldPrice: 16422,

    makingCharges: 9108,
    makingDiscountPercent: 22,
    discountAmount: 2003.76,
    makingChargesAfterDiscount: 7104.24,
    totalAmount: 29796,
  },
  {
    id: "5",
    slug: "nirva-halo-circle-earrings",
    sku: "NIR-TOP-005",
    images: [womensjewellerytopsfive],

    mainCategory: "Women's Jewellery",
    subCategory: "Tops",
    productName: "Nirva Halo Circle Earrings",
    productDescription: "Elegant halo circle earrings for daily lightweight wear.",
    productImage: womensjewellerytopsfive,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 1.9,
    stoneWeight: 0.216,
    netWeight: 1.684,
    goldRate: 5950,
    stoneInCarat: 1.08,
    perCtCost: 2200,
    stoneCost: 2376,
    goldPrice: 10019.8,

    makingCharges: 5557.2,
    makingDiscountPercent: 22,
    discountAmount: 1222.58,
    makingChargesAfterDiscount: 4334.62,
    totalAmount: 16730,
  },
  {
    id: "6",
    slug: "nirva-regal-cone-drops",
    sku: "NIR-TOP-006",
    images: [womensjewellerytopssix],

    mainCategory: "Women's Jewellery",
    subCategory: "Tops",
    productName: "Nirva Regal Cone Drops",
    productDescription: "Bold regal cone drops crafted with substantial gold weight.",
    productImage: womensjewellerytopssix,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 5.89,
    stoneWeight: 0.54,
    netWeight: 5.35,
    goldRate: 5950,
    stoneInCarat: 2.7,
    perCtCost: 2200,
    stoneCost: 5940,
    goldPrice: 31832.5,

    makingCharges: 17655,
    makingDiscountPercent: 22,
    discountAmount: 3884.10,
    makingChargesAfterDiscount: 13770.90,
    totalAmount: 51543,
  },
  {
    id: "7",
    slug: "nirva-emerald-star-studs",
    sku: "NIR-TOP-007",
    images: [womensjewellerytopsseven],

    mainCategory: "Women's Jewellery",
    subCategory: "Tops",
    productName: "Nirva Emerald Star Studs",
    productDescription: "Elegant emerald star studs featuring a sleek profile.",
    productImage: womensjewellerytopsseven,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 3.01,
    stoneWeight: 0.41,
    netWeight: 2.6,
    goldRate: 5950,
    stoneInCarat: 2.05,
    perCtCost: 2200,
    stoneCost: 4510,
    goldPrice: 15470,

    makingCharges: 8580,
    makingDiscountPercent: 22,
    discountAmount: 1887.60,
    makingChargesAfterDiscount: 6692.40,
    totalAmount: 26672,
  },
  {
    id: "8",
    slug: "nirva-emerald-snowdrop-earrings",
    sku: "NIR-TOP-008",
    images: [womensjewellerytopseight],

    mainCategory: "Women's Jewellery",
    subCategory: "Tops",
    productName: "Nirva Emerald Snowdrop Earrings",
    productDescription: "Sparkling emerald snowdrop earrings designed for evening charm.",
    productImage: womensjewellerytopseight,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 4.4,
    stoneWeight: 0.82,
    netWeight: 3.58,
    goldRate: 5950,
    stoneInCarat: 4.1,
    perCtCost: 2200,
    stoneCost: 9020,
    goldPrice: 21301,

    makingCharges: 11814,
    makingDiscountPercent: 22,
    discountAmount: 2599.08,
    makingChargesAfterDiscount: 9214.92,
    totalAmount: 39536,
  },
  {
    id: "9",
    slug: "nirva-lakshmi-devi-earrings",
    sku: "NIR-TOP-009",
    images: [womensjewellerytopsnine],

    mainCategory: "Women's Jewellery",
    subCategory: "Tops",
    productName: "Nirva Lakshmi Devi Earrings",
    productDescription: "Sacred Lakshmi Devi earrings featuring traditional craftsmanship.",
    productImage: womensjewellerytopsnine,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 4.66,
    stoneWeight: 0.12,
    netWeight: 4.53,
    goldRate: 5950,
    stoneInCarat: 0.6,
    perCtCost: 2200,
    stoneCost: 1320,
    goldPrice: 26953.5,

    makingCharges: 14949,
    makingDiscountPercent: 22,
    discountAmount: 3288.78,
    makingChargesAfterDiscount: 11660.22,
    totalAmount: 39934,
  },

    {
    id: "10",
    slug: "emerald-majesty-necklace-set",
    sku: "NIR-NCK-01",
    images: [emeraldmajestynecklaceset1,emeraldmajestynecklaceset2],

    mainCategory: "Women's Jewellery",
    subCategory: "Necklaces",
    productName: "Emerald Majesty Necklace Set",
    productDescription: "An exquisite emerald majesty necklace set crafted for royal elegance.",
    productImage: emeraldmajestynecklaceset1,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 58.21,
    stoneWeight: 17.338,
    netWeight: 40.872,
    goldRate: 5950,
    stoneInCarat: 86.69,
    perCtCost: 2200,
    stoneCost: 190718,
    goldPrice: 243188.4,

    makingCharges: 134877.6,
    makingDiscountPercent: 22,
    discountAmount: 29673.07,
    makingChargesAfterDiscount: 105204.53,
    totalAmount: 539111,
  },
  {
    id: "11",
    slug: "crystal-elephant-parade-necklace",
    sku: "NIR-NCK-02",
    images: [crystalelephantparadenecklacset1,crystalelephantparadenecklacset2],

    mainCategory: "Women's Jewellery",
    subCategory: "Necklaces",
    productName: "Crystal Elephant Parade Necklace",
    productDescription: "Traditional crystal elephant parade necklace featuring intricate details.",
    productImage: crystalelephantparadenecklacset1,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 37.76,
    stoneWeight: 2.06,
    netWeight: 35.7,
    goldRate: 5950,
    stoneInCarat: 10.3,
    perCtCost: 2200,
    stoneCost: 22660,
    goldPrice: 212415,

    makingCharges: 117810,
    makingDiscountPercent: 22,
    discountAmount: 25918.20,
    makingChargesAfterDiscount: 91891.80,
    totalAmount: 326967,
  },
  {
    id: "12",
    slug: "royal-elephant-charm-necklace",
    sku: "NIR-NCK-03",
    images: [royalelephantcharmnecklaceset1,royalelephantcharmnecklaceset2],

    mainCategory: "Women's Jewellery",
    subCategory: "Necklaces",
    productName: "Royal Elephant Charm necklace",
    productDescription: "Regal elephant charm necklace perfect for grand occasions.",
    productImage: royalelephantcharmnecklaceset1,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 37.37,
    stoneWeight: 1.78,
    netWeight: 35.59,
    goldRate: 5950,
    stoneInCarat: 8.9,
    perCtCost: 2200,
    stoneCost: 19580,
    goldPrice: 211760.5,

    makingCharges: 117447,
    makingDiscountPercent: 22,
    discountAmount: 25838.34,
    makingChargesAfterDiscount: 91608.66,
    totalAmount: 322949,
  },
  {
    id: "13",
    slug: "emerald-royale-heritage-necklace",
    sku: "NIR-NCK-04",
    images: [emeraldroyaleheritagenecklaceset1],

    mainCategory: "Women's Jewellery",
    subCategory: "Necklaces",
    productName: "Emerald Royale Heritage Necklace",
    productDescription: "Heritage-inspired emerald royale necklace set.",
    productImage: emeraldroyaleheritagenecklaceset1,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 21.87,
    stoneWeight: 4.28,
    netWeight: 17.59,
    goldRate: 5950,
    stoneInCarat: 21.4,
    perCtCost: 2200,
    stoneCost: 47080,
    goldPrice: 104660.5,

    makingCharges: 58047,
    makingDiscountPercent: 22,
    discountAmount: 12770.34,
    makingChargesAfterDiscount: 45276.66,
    totalAmount: 197017,
  },
  {
    id: "14",
    slug: "radiance-white-stone-necklace",
    sku: "NIR-NCK-05",
    images: [radiancewhitestonenecklaceset1],

    mainCategory: "Women's Jewellery",
    subCategory: "Necklaces",
    productName: "Radiance White Stone Necklace",
    productDescription: "Radiant white stone necklace bringing sparkle to every moment.",
    productImage: radiancewhitestonenecklaceset1,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 19.22,
    stoneWeight: 3.49,
    netWeight: 15.73,
    goldRate: 5950,
    stoneInCarat: 17.45,
    perCtCost: 2200,
    stoneCost: 38390,
    goldPrice: 93593.5,

    makingCharges: 51909,
    makingDiscountPercent: 22,
    discountAmount: 11419.98,
    makingChargesAfterDiscount: 40489.02,
    totalAmount: 172473,
  },
  {
    id: "15",
    slug: "tirumala-balaji-divine-pendant",
    sku: "NIR-PND-06",
    images: [tirumalabalajidivinependantset1],

    mainCategory: "Women's Jewellery",
    subCategory: "Pendants",
    productName: "Tirumala Balaji Divine Pendant",
    productDescription: "A divine Tirumala Balaji pendant meticulously crafted in 9KT gold.",
    productImage: tirumalabalajidivinependantset1,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 5.73,
    stoneWeight: 0.88,
    netWeight: 4.85,
    goldRate: 5950,
    stoneInCarat: 4.4,
    perCtCost: 2200,
    stoneCost: 9680,
    goldPrice: 28857.5,

    makingCharges: 16005,
    makingDiscountPercent: 22,
    discountAmount: 3521.10,
    makingChargesAfterDiscount: 12483.90,
    totalAmount: 51021,
  },
  {
    id: "16",
    slug: "hanuman-gada-divine-pendant",
    sku: "NIR-PND-07",
    images: [hanumangadadivinependantset2],

    mainCategory: "Women's Jewellery",
    subCategory: "Pendants",
    productName: "Hanuman Gada Divine Pendant",
    productDescription: "Sacred Hanuman Gada pendant representing strength and devotion.",
    productImage: hanumangadadivinependantset2,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 6.37,
    stoneWeight: 0.34,
    netWeight: 6.03,
    goldRate: 5950,
    stoneInCarat: 1.7,
    perCtCost: 2200,
    stoneCost: 3740,
    goldPrice: 35878.5,

    makingCharges: 19899,
    makingDiscountPercent: 22,
    discountAmount: 4377.78,
    makingChargesAfterDiscount: 15521.22,
    totalAmount: 55140,
  },
  {
    id: "17",
    slug: "regal-vine-gold-bangles",
    sku: "NIR-BGL-08",
    images: [regalvinegoldbanglesset1],

    mainCategory: "Women's Jewellery",
    subCategory: "Bangles",
    productName: "Regal Vine Gold Bangles",
    productDescription: "Classic solid gold bangles with elegant regal vine patterns.",
    productImage: regalvinegoldbanglesset1,

    goldColor: "yellow",
    goldPurity: "37.5",
    grossWeight: 27.13,
    stoneWeight: 0,
    netWeight: 27.13,
    goldRate: 5950,
    stoneInCarat: 0,
    perCtCost: 2200,
    stoneCost: 0,
    goldPrice: 161423.5,

    makingCharges: 89529,
    makingDiscountPercent: 22,
    discountAmount: 19696.38,
    makingChargesAfterDiscount: 69832.62,
    totalAmount: 231256,
  }

  
//   {
//       id: "10",
//       title: "Womens Bangles",
//       price: 0,
//       image: womensbanglesone,
//       category: "bangles",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//    {
//       id: "11",
//       title: "Womens Bangles",
//       price: 0,
//       image: womensbanglestwo,
//       category: "bangles",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "12",
//       title: "Womens Bangles",
//       price: 0,
//       image: womensbanglesthree,
//       category: "bangles",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "13",
//       title: "Womens Bangles",
//       price: 0,
//       image: womensbanglesfour,
//       category: "bangles",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "14",
//       title: "Womens Bangles",
//       price: 0,
//       image: womensbanglesfive,
//       category: "bangles",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "15",
//       title: "Womens Bangles",
//       price: 0,
//       image: womensbanglessix,
//       category: "bangles",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "16",
//       title: "Womens Earrings",
//       price: 0,
//       image: womensearringstwo,
//       category: "earrings",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "17",
//       title: "Womens Earrings",
//       price: 0,
//       image: womensearringstwo,
//       category: "earrings",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "18",
//       title: "Womens Earrings",
//       price: 0,
//       image: womensearringsthree,
//       category: "earrings",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },

//   {
//       id: "19",
//       title: "Womens Earrings",
//       price: 0,
//       image: womensearringsfour,
//       category: "earrings",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },

//   {
//       id: "20",
//       title: "Womens Earrings",
//       price: 0,
//       image: womensearringsfive,
//       category: "earrings",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//    {
//       id: "21",
//       title: "Womens Earrings",
//       price: 0,
//       image: womensearringssix,
//       category: "earrings",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },

//   {
//       id: "22",
//       title: "Womens Necklaces",
//       price: 0,
//       image: womennecklaceone,
//       category: "necklaces",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//    {
//       id: "23",
//       title: "Womens Necklaces",
//       price: 0,
//       image: womennecklacetwo,
//       category: "necklaces",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "24",
//       title: "Womens Necklaces",
//       price: 0,
//       image: womennecklacethree,
//       category: "necklaces",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "25",
//       title: "Womens Necklaces",
//       price: 0,
//       image: womennecklacefour,
//       category: "necklaces",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "26",
//       title: "Womens Necklaces",
//       price: 0,
//       image: womennecklacefive,
//       category: "necklaces",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "27",
//       title: "Womens Necklaces",
//       price: 0,
//       image: womennecklacesix,
//       category: "necklaces",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//    {
//       id: "28",
//       title: "Womens Necklaces",
//       price: 0,
//       image: womennecklaceseven,
//       category: "necklaces",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "29",
//       title: "Bracelets",
//       price: 0,
//       image: womenbraceletsone,
//       category: "bracelets",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
//   {
//       id: "30",
//       title: "Bracelets",
//       price: 0,
//       image: womenbraceletstwo,
//       category: "bracelets",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },

//   {
//       id: "31",
//       title: "Chains",
//       price: 0,
//       image: womenchainsone,
//       category: "chains",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },

//   {
//       id: "32",
//       title: "Chains",
//       price: 0,
//       image: womenchainstwo,
//       category: "chains",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },
  
//   {
//       id: "33",
//       title: "Chains",
//       price: 0,
//       image: womenchainsthree,
//       category: "chains",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },

//   {
//       id: "34",
//       title: "Pendants",
//       price: 0,
//       image: womenpendantsone,
//       category: "pendants",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },

//   {
//       id: "35",
//       title: "Pendants",
//       price: 0,
//       image: womenpendantstwo,
//       category: "pendants",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },

//     {
//       id: "36",
//       title: "Waist Belt",
//       price: 0,
//       image: womenwaistbeltone,
//       category: "waistbelt",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },

//    {
//       id: "37",
//       title: "Waist Belt",
//       price: 0,
//       image: womenwaistbelttwo,
//       category: "waistbelt",
//       description: "",
//       priceRange: undefined,
//       variants: undefined
//   },

 
];