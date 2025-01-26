import { Product } from "../types/Product"
import { Link } from "react-router-dom"
import { Button, Card, CardBody } from "react-bootstrap"
import Rating from "./Rating"
import { useContext } from "react"
import { Store } from "../Stores"
import { convertProductToCartItem } from "../utils"
import { CartItem } from "../types/Cart"
import { toast } from "react-toastify"

function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandle = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product.countInStock < quantity) {
      alert("Sorry. Product is out of stock")
      return
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    })
    toast.success("Product added to the cart")
  }

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <CardBody>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandle(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </CardBody>
    </Card>
  )
}

export default ProductItem
