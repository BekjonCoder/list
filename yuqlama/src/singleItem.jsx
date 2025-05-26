import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { toast } from 'sonner'
import customFetch from './baase'
import { FaPen } from 'react-icons/fa'

const SingleItem = ({item}) => {
    const [modal,setModal]=useState(true)
    const [newItemName,setNewItemName]=useState('')
    
    const queryClint=useQueryClient()
    const {mutate:deleTask}=useMutation({
        mutationFn:(taskId)=>{
            return customFetch.delete(`/api/users/${taskId}`)
        },
        onSuccess:()=>{
            queryClint.invalidateQueries({queryKey:["tasks"]})
            toast.success("Ma'lumot o'chirildi")
        }
    })
    const {mutate:editTask}=useMutation({
        mutationFn:({taskId,active})=>{
            return customFetch.patch(`/api/users/${taskId}`,{active})
        },
        onSuccess:()=>{
            queryClint.invalidateQueries({queryKey:["tasks"]})
            if(!item.active){
                toast.success(`${item.name} kelgan`)
            }else{
                toast.error(`${item.name} kelmagan`)
            }
        }
    })
    const {mutate:editName}=useMutation({
        mutationFn:({taskId,name})=>{
            return customFetch.patch(`/api/users/${taskId}`,{name})
        },
        onSuccess:()=>{
            queryClint.invalidateQueries({queryKey:["tasks"]})
                toast.success(`${item.name} tahrirlandi`)
                setModal(true)
        }
    })
  return (
    modal?<div className="item">
      <div className="name" style={{display:"flex",justifyItems:"center",alignItems:"center", gap:"1rem"}}><FaPen onClick={()=>setModal(false)} style={{cursor:"pointer"}} /> {item.name}</div>
      <div style={{display:"flex", justifyItems:"center", alignItems:"center", gap:"1rem"}}>
        <button className={item.active?"Kelgan":"Kelmagan"}  onClick={()=>editTask({taskId:item.id,active:!item.active})} >{item.active?"Kelgan":"Kelmagan"}</button>
      <MdDelete  style={{cursor:"pointer"}} onClick={()=>deleTask(item.id)}/>
      </div>
    </div>:
    <div className='item'>
        <div className="input">
        <input  type="text" placeholder={item.name} onChange={(e)=>setNewItemName(e.target.value)} value={newItemName} />
        <button className='btn' onClick={()=>editName({taskId:item.id,name:newItemName})}>Tahrirlash</button>
        </div>
    </div>
  )
}

export default SingleItem