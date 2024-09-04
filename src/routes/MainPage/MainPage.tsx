
import { useState } from 'react'
import '../../App.scss'
import CategoryList from '../../components/HeadCategories/HeadeCategories'
import PizzaList from '../../components/PizzaList/PizzaList'
import ProductList from '../../components/Promotion/Promotion'
import StoriesSlider from '../../components/stories/Stories'

function MainPage() {
    const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);

    const handleScroll = () => {
        if (targetRef) {
            targetRef.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>

            <div className="container">
                <CategoryList />
                <br />
                <StoriesSlider />
                <ProductList />
                <PizzaList />


            </div>



        </>
    )
}

export default MainPage
