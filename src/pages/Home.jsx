import React from 'react'
import Nav from '../components/Nav'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
    const [expenseItemLists, setExpenseItemLists] = useState([])
    const [total, setTotal] = useState(0)
    const [wallets, setWallets] = useState()

    useEffect(() => {
        fetchAllExpenseItem()
        fetchAllWallet()
    }, [])

    const fetchAllExpenseItem = async () => {
        try {
            const response = await axios.get(`https://digistar-demo-be.vercel.app/api/expense-items`)
            const data = await response.data
            setExpenseItemLists(data.data)
            setTotal(data.total)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAllWallet = async () => {
        try {
            const response = await axios.get(`https://digistar-demo-be.vercel.app/api/wallets`)
            const data = await response.data
            setWallets(data.data)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Nav />
            <div className='flex w-full h-screen '>
                <div className='flex w-full  pt-28 p-[1.5rem] flex-col'>
                    <div>
                        <div className="card bg-base-100 w-52 p-0">
                            <div className="card-body pl-[0.5rem]">
                                <h1 className="card-title text-2xl">All Wallet</h1>
                                <div className="card-actions">
                                    <div className="dropdown dropdown-bottom">
                                        <div tabIndex={0} role="button" className="btn m-1">Change Wallet</div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                            {wallets?.map((item, i) => (
                                                <li key={i}><a>{item.name}</a></li>
                                            ))}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full flex-row gap-2'>
                        <button className="btn btn-outline btn-sm">Group by</button>
                        <button className="btn btn-outline btn-sm">Dates</button>
                        <button className="btn btn-outline btn-sm">Types</button>
                    </div>
                    <div className='flex w-full mt-5'>
                        <div className='flex w-full justify-between'>
                            <h1 className='font-bold'>September 5 2024</h1>
                            <p className='text-sm text-gray-500'>Number of transaction: {total}</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-3'>
                        {expenseItemLists?.map((item, i) => (
                            <div className="card bg-base-100 w-full shadow-xl" key={i}>
                                <div className="card-body">
                                    <h2 className="card-title">{item.title}</h2>
                                    <h3 className='font-bold'>{item.flowType}</h3>
                                    <p>{item.createdAt}</p>
                                    <div className="card-actions justify-end">
                                        <h3 className='font-bold'>{item.flowType === "income" ? `- ${item.amount}` : `+ ${item.amount}` }</h3>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className='flex flex-col w-[30%] h-full pt-28 border-l'>
                    <div className='flex p-10 gap-4 flex-col'>
                        <div className='flex w-full justify-between items-center'>
                            <h1 className='font-bold text-xl'>Wallets</h1>
                            <button className="btn btn-circle btn-outline btn-sm">
                                +
                            </button>
                        </div>

                        <div className="flex flex-col">
                            {wallets?.map((item, i) => (
                                <p key={i}>{item.name}</p>
                            ))}
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className='flex p-10 gap-4 flex-col'>
                        <div className='flex w-full justify-between items-center'>
                            <h1 className='font-bold text-xl'>Categories</h1>
                            <button className="btn btn-circle btn-outline btn-sm">
                                +
                            </button>
                        </div>

                        <div className="flex flex-col">
                            {wallets?.map((item, i) => (
                                <p key={i}>{item.name}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home