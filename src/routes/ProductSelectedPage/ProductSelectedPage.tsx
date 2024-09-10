import { useEffect } from 'react'
import PizzaCard from '../../components/SinglePage/PizzaCard'
import { useAppDispatch } from '../../store/hook'
import { useParams } from 'react-router-dom'
import { fetchProduct, fetchProductByID } from '../../store/reducers/productReduser'
import Reviews from '../../components/SinglePage/Rewue/Rewue'

const ProductSelectedPage = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    


    useEffect(() => {
        dispatch(fetchProduct({ filters: '' }))
        dispatch(fetchProductByID({ id: Number(id) }))
    }, [id])
    return (
        <div className='container'>
            <PizzaCard />
            <Reviews/>
        </div>
    )
}

export default ProductSelectedPage
