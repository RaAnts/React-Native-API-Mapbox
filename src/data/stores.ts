export interface StoreData {
  id: string;
  name: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  description: string;
}

export const storesData: readonly StoreData[] = [
  {
    id: '1',
    name: 'HOPITAL Salfa ivory atsimo',
    // imageUrl: 'https://images4.alphacoders.com/869/869425.jpg',
    imageUrl: 'https://scontent.ftnr3-1.fna.fbcdn.net/v/t31.18172-8/13041176_930555550394290_2350235917388857774_o.jpg?stp=dst-jpg_p180x540&_nc_cat=100&ccb=1-7&_nc_sid=25d718&_nc_ohc=6xNIMvdi_d4Q7kNvgGT1K28&_nc_ht=scontent.ftnr3-1.fna&oh=00_AYDSuXgKz8dXy0xzTY7jd-H-6CbzU7r6Ie_xiy4QLR_i5g&oe=66DA965B',
    latitude: -21.45153, 
    longitude: 47.09323, 
    description: '...',
  },
  {
    id: '2',
    name: 'Centre Hospitalier Universitaire Tambohobe',
    imageUrl: 'https://scontent.ftnr3-1.fna.fbcdn.net/v/t1.6435-9/67099721_876609206035108_6382537932632227840_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=53a332&_nc_ohc=6666GXz_kSoQ7kNvgGxLBXb&_nc_ht=scontent.ftnr3-1.fna&oh=00_AYBiU2BDAhASj7SjADMt34gp_Tf6I0TVmKYyiW3ifGKndA&oe=66DAB900',
    latitude: -21.44478,
    longitude: 47.08649,
    description: '...',
  },
  {
    id: '3',
    name: 'CSB II Anjoma',
    imageUrl: 'https://scontent.ftnr3-1.fna.fbcdn.net/v/t1.6435-9/108500765_2381942875443610_5119043874300370550_n.jpg?stp=dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_ohc=oBG3_F-8bCUQ7kNvgGOPJTE&_nc_ht=scontent.ftnr3-1.fna&oh=00_AYAFtmJ6qfH6wtrEvJdM46x8eA0r995cKv_P-DVZpiPeDA&oe=66DAB620',
    latitude: -21.45582,
    longitude: 47.08851,
    description: '...',
  },
  {
    id: '4',
    name: 'CSB Mitsimbina',
    imageUrl: 'https://scontent.ftnr3-1.fna.fbcdn.net/v/t39.30808-6/310461162_1035149750536931_7854006472941362968_n.jpg?stp=dst-jpg_p720x720&_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=3wp4NHj7jMMQ7kNvgFfq9aL&_nc_ht=scontent.ftnr3-1.fna&oh=00_AYBUL9sM39wKqbmo4tPYWOmjMVU4TwxG1XPL1zNY71Bc1Q&oe=66B90CAC',
    latitude: -21.45873,
    longitude: 47.10390,
    description: '...',
  },
  {
    id: '5',
    name: 'Centre Hospitalier Universitaire Andrainjato',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LGZP-w3EPrH_zsaMf1oG6eGLD37_p5Rc6w&s',
    latitude: -21.46216,  
    longitude: 47.10981,
    description: '...',
  },
  // Add more store entries as needed
];
