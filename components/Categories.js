import { categories } from '../utils/data.js';
import CategoryList from './CategoryList.js';

const Categories = () => {
  return (
    <div className='flex md:flex-row p-0 flex-col justify-between '>
      {categories.map((item) => (
        <CategoryList item={item} key={item.id} />
      ))}
    </div>
  )
}

export default Categories