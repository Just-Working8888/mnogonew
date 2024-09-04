import { useEffect } from 'react'
import PizzaCard from '../../components/SinglePage/PizzaCard'
import { useAppDispatch } from '../../store/hook'
import { useParams } from 'react-router-dom'
import { fetchProduct, fetchProductByID } from '../../store/reducers/productReduser'

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
        </div>
    )
}

export default ProductSelectedPage
