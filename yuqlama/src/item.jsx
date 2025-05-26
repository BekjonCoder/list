import { useQuery } from '@tanstack/react-query'
import customFetch from './baase'
import SingleItem from './singleItem'

const Item = () => {
    const {data,isLoading,isError}=useQuery({
        queryKey:["tasks"],
        queryFn: async()=>{
            const {data}=await customFetch.get("/api/users")
            return data
            
        }
    })
    
    if(isLoading)return <p>Yuklanmoqda...</p> 
    if(isError)return <p>Xatolik...</p>
    
  return (
    <div className='list1'>
        {
             data.map((item)=>{
                return <SingleItem key={item.id} item={item} />
            })
        }
    </div>
  )
}

export default Item