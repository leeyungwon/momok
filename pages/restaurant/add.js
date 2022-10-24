import Transition from '~/components/Common/Transition'
import SimpleLayout from '~/layouts/simple'

import AddRestaurantComponent from '~/components/Restaurant/Add'

const AddRestaurant = () => (
  <Transition>
    <AddRestaurantComponent />
  </Transition>
)

AddRestaurant.getLayout = page => <SimpleLayout>{page}</SimpleLayout>

export default AddRestaurant
