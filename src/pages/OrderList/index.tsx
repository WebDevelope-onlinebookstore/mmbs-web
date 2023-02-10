import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores';
import "./cart.css";

export default function OrderList() {

    const [cartList, setCartList] = useState<any[]>([]);
    const [selectCart, setSelectCart] = useState<number[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [expectedPrice, setExpectedPrice] = useState<number>(0);
    const [flag, setFlag] = useState<boolean>(true);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const [cookies] = useCookies();
    const navigator = useNavigate();

    const deleteCartList = (cartId: number) =>{
        
        const data = { cartId };

        const token = cookies.token;
        
        axios
        .post("http://localhost:4080/api/cart/cartDelete", data, {headers: {Authorization: `Bearer ${token}`}})
        .then((response)=>{
            const data = response.data;
            if(data.result){
                const list = data.data;
                setCartList(list);
            }
        })
        .catch((error) => {"qweee" });
      };

    const saveCartList = () => {

        const selectCartList: any[] = []
        selectCart.forEach((selected) => {
            cartList.forEach((cart) => {
                if(cart.cartId === selected) selectCartList.push(cart);
            })
        })
        
        const data = {
            selectCartList
          };
        // const changeAmount=()=>{
        //     setCartProductAmount
        // }

        const token = cookies.token;

        axios
        .post("http://localhost:4080/api/cart/cartAmountUpdate", data, {headers: {Authorization: `Bearer ${token}`}})
        .then((response)=>{
            const data = response.data;
            if(data.result){
                alert('성공')
                console.log(data)
                navigator('/orderPayment')
                
            }
        })
        .catch((error) => {"qweee" });
      };
    

    const setSelectCartItem = (cartId: number) => {
        let totalCount = 0;
        const tmp: number[] = [];
        if (selectCart.findIndex((element) => element === cartId) === -1) {
            selectCart.forEach((item) => {
                tmp.push(item);
            })
            tmp.push(cartId);
        }
        else {
            selectCart.forEach((item) => {
                if (item !== cartId) tmp.push(item);
            })
        }
        setSelectCart(tmp);
        let total = 0;
        cartList.forEach((cartItem) => {
            if (tmp.findIndex((element) => element === cartItem.cartId) !== -1) {
                total += cartItem.cartProductPrice * cartItem.cartProductAmount;
                totalCount += cartItem.cartProductAmount;
            }
        })
        const expected = total < 30000 ? total + 3000 : total;
        setTotalAmount(totalCount);
        setTotalPrice(total);
        setExpectedPrice(expected);
    }

    const getCartList = () => {

        console.log(cookies.token)

        axios.post('http://localhost:4080/api/cart/showInCart', {}, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then((response) => {
            const list = response.data.data;
            setCartList(list);
        })
    }

    const addAmount = (cartId: number, num: number) => {
        let totalCount = 0;
        cartList.forEach((cartItem) => {
            if (cartItem.cartId === cartId) {
                if (!(cartItem.cartProductAmount === 1 && num === -1)){
                    cartItem.cartProductAmount += num;
                }
            }
        })

        let total = 0;
        cartList.forEach((cartItem) => {
            if (selectCart.findIndex((element: any) => element === cartItem.cartId) !== -1) { total += cartItem.cartProductPrice * cartItem.cartProductAmount; totalCount += cartItem.cartProductAmount; }
        })
        const expected = total < 30000 ? total + 3000 : total;
        
        setTotalPrice(total);
        setExpectedPrice(expected);
        setCartList(cartList);
        setTotalAmount(totalCount);
        setFlag(!flag);
    }

    useEffect(() => {
        getCartList();
    }, [])

    return (

        <div>
            <h1 className="cart-txt">주문내역
                <div className="title-bottom">
                </div>
            </h1>
            <ul className="cart-active-tap" >
                <li className="active-tap">
                    <span>도서상품( <em>{totalAmount}</em> )
                    </span>
                </li>


            </ul>
            <div className="cart-info-txt">
                <span>도서 상품</span>
                <em></em>
                <strong>{totalAmount}건</strong>
                
            </div>
            <div className="table-order">
                <table className="table">
                    <caption>주문 내역</caption>
                    <colgroup>
                        <col style={{ width: '72px' }} />
                        <col style={{ width: '140px' }} />
                        <col />
                        <col style={{ width: '170px' }} />
                        <col style={{ width: '170px' }} />
                        <col style={{ width: '190px' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th colSpan={2}>상품정보</th>
                            <th>이미지</th>
                            <th>금액</th>
                            <th>수량</th>
                            <th>배송조회</th>
                            <th>주문 내역 삭제</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='showInFo'>
                        {cartList.length === 0 && (
                            <tr>
                                <td className="text-no-data" colSpan={8} >
                                    <span className="no-data">주문 내역이 없습니다.</span>

                                </td>
                            </tr>
                        )}
                        {cartList.map((cartItem) => (
                            <tr>
                                <td><input type="checkBox" onChange={() => setSelectCartItem(cartItem.cartId)} /></td>
                                <td colSpan={2}>{cartItem.cartProductName}</td>
                                <td><div><img src={cartItem.cartProductImage} width="80%" height="100px" /></div></td>
                                <td>{cartItem.cartProductPrice}원</td>
                                <td><button className='amountButton' onClick={() => addAmount(cartItem.cartId, 1)}>△</button> {cartItem.cartProductAmount }  권 <button onClick={() => addAmount(cartItem.cartId, -1)}>▽</button></td>
                                <td>{cartItem.cartProductPrice * cartItem.cartProductAmount}원</td>
                                <td><button onClick={()=>deleteCartList(cartItem.cartId)}>❎</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
