import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import customFetch from './baase'
import { toast } from 'sonner'

const Form = () => {
    const [newItemName,setNewItemName]=useState('')
    const queryClint=useQueryClient()
    const {mutate:createTask,isLoading}=useMutation({
        mutationFn:(taskName)=>{
            return customFetch.post("/api/users",{
                name:taskName
            })
        },
        onSuccess:()=>{
            queryClint.invalidateQueries({queryKey:["tasks"]})
            toast.success("Yangi odam qo'shildi")
            setNewItemName('')
        },
        onError:(error)=>{
            toast.error(error?.response?.data?.msg)
        }
    })
    if(isLoading)return <p>Yuklanmoqda...</p>
    const handleSubmit=(e)=>{
        e.preventDefault()
        createTask(newItemName)
    }
  return (
    <div>
    <h1>Yuqlama</h1>
    <div className="list1">
    <form className="add-form" onSubmit={handleSubmit} >
      <input type="text"  placeholder="Ism kiriting..." value={newItemName} onChange={(event)=>setNewItemName(event.target.value)} />
      <button className="btn" type="submit">Qo‘shish</button>
    </form>
  </div>

    </div>
  )
}

export default Form