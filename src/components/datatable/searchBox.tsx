import { changeFilter,changeCurrent } from './tableSlice'
import { useDispatch } from 'react-redux'


function SearchBox(){
    const dispatch = useDispatch()
    const handleInput = (event:any)=>{
        dispatch(changeFilter(event.target.value))
        dispatch(changeCurrent(1))
    }
    
    return(
        <input onChange={handleInput} placeholder="search" className="form-control form-control-sm"/>
    )
}

export default SearchBox