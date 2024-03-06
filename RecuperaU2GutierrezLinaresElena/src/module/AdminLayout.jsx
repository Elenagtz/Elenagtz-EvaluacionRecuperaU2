import React from 'react'
import { Navbar, Sidebar, Badge } from 'flowbite-react'
import { Link, Outlet } from 'react-router-dom'
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';


const AdminLayout = () => {
    return (

        //diseñar el layout del admin quedooo
        <>
            <header>
                <Navbar fluid rounded>
                    <Navbar.Brand as={Link} href="https://flowbite-react.com">
                        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Admin</span>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Navbar.Link href="#" active>
                            Home
                        </Navbar.Link>
                        <Navbar.Link as={Link} href="#">
                            About
                        </Navbar.Link>
                        <Navbar.Link href="#">Services</Navbar.Link>
                        <Navbar.Link href="#">Pricing</Navbar.Link>
                        <Navbar.Link href="#">Contact</Navbar.Link>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <div className='flex'> 
            <aside>
            <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox} label="3">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
            </aside>

            <main className='w-full'>
                <section className='px-4 pt-2 pb-8'> 
                <Outlet />
                </section>
                </main>
                </div>
        </>
    )
}

export default AdminLayout