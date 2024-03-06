import { Button, Badge, Card, Label, TextInput } from 'flowbite-react'
import React, { useEffect, useMemo, useState } from 'react'
import AxiosClient from '../../config/http-gateway/http-client';
import TableComponent from '../../components/TableComponent';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";


const UserPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');

  const columns = useMemo(() => [
    {
      name: "#",
      cell: (row, index) => <>{index + 1}</>,
      sortable: true,
      selector: (row, index) => index + 1
    },
    {
      name: "Usuario",
      cell: (row) => <>{row.username}</>,
      sortable: true,
      selector: (row) => row.username
    },
    {
      name: "Rol",
      cell: (row) => <>{row.roles[0].name}</>,
      sortable: true,
      selector: (row) => row.roles[0].name
    },
    {
      name: "Estado",
      cell: (row) => <Badge color={row.status ? "success" : "failure"}>
        {row.status ? "activo" : "inactivo"}
      </Badge>,
      sortable: true,
      selector: (row) => row.status
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Button><FaEdit />
          </Button>
          <Button><MdDelete />
          </Button>
        </>
      )
    }
  ])

  const getUsers = async () => {
    try {
      setLoading(true)
      const response = await AxiosClient({
        url: "/user/",
        method: "GET"
      })
      console.log(response)
      if (!response.error) (response.data);
      setUsers(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const filter = () => {
    return users.filter(user => user.username.includes(filterText));
  }

  return (
    <>
      <section className='flex flex-col pt-4 px-3 gap-4'>
        <h4 className='text-2xl'>Clientes</h4>
        <div className='flex w-full justify-between'>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="search" value="Buscar" />
            </div>
            <TextInput id="search"
             type="search" 
             rightIcon={IoIosSearch}
             value={filterText}
             placeholder="Buscar..." requir ed 
             onChange={(e) => setFilterText(e.target.value)}
             />
          </div>
          <div>
          <Button pill outline color='success'>Agregar</Button>
          </div>  
        </div>
        <Card>
          <TableComponent
            columns={columns}
            data={filter()}
            progress={loading}
          />
        </Card>
      </section>
    </>
  )
}

export default UserPage
