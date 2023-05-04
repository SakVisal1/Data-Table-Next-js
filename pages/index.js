import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Layout from '@/components/layout'
import DataTable , { createTheme } from 'react-data-table-component';
import DataProduct from '@/components/product';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import handler from './api/hello';
import { Input } from 'postcss';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [product, setProduct] = useState([])
  const [search , setSearch] = useState(" ");
  const [filterProducts ,setFilterProducts] = useState([]);
  const getProducts = async () => {
         const response = await axios.get(`https://api.escuelajs.co/api/v1/products/`)
        setProduct(response.data)
        setFilterProducts(response.data)
        console.log(product)
  }

  const columns= [
    {
        name: "Product Name",
        selector: row => row.title,
        sortable: true,
    },
    {
        name: "Price",
        selector: row => row.price,
    },
    {
      name: "Category",
      selector: row => row.category.name,
  },
    {
        name: "Photo",
        selector: row => <img src={row.images} width={100} height={100}/>,
    },
    {
      name: "Action",
      cell: (row) =>  <button className='btn btn-warning' onClick={() => alert(row.id)}>Edit</button>,
    },
]

  useEffect(() => {
      getProducts();
  },[])

  useEffect(() => {
      const result = product.filter(products => {
        return products.category.name.toLowerCase().match(search.toLowerCase());
      });
      setFilterProducts(result);
  },[search])

  return (
      <Layout>
          <DataTable
          title='Products'
          columns={columns}
          data={filterProducts}
          pagination
          fixedHeader
          fixedHeaderScrollHeight='500px'
          subHeader
          subHeaderComponent={
            <input type='text'
             placeholder='Search Here'
              className='form-control w-25'
              value={search}
              onChange={(e) => setSearch(e.target.value)}/>
          }
          />
      </Layout>
  )
}

// export async function getServerSideProps(){
//   const resp = await fetch('https://api.escuelajs.co/api/v1/products')
//   const results = await resp.json()
//   console.log('---------getServerSideProps------------------')
//   return{
//       props: {
//           results
//       }
//   }
// }

