import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import firebase from 'firebase'
import { useAuth } from '../../context/AuthContext';
import GooglePayButton from '@google-pay/button-react';
import './Purchase.scss'

function Purchase(props) {

  const params = useParams()
  const { currentUser } = useAuth()
  const [book, setBook] = useState(null)
  const [bookPrice, setBookPrice] = useState(null)
  const history = useHistory()

  function buyBook() {
    firebase.firestore()
      .collection('users')
      .doc(currentUser.uid)
      .update({ purBooks: firebase.firestore.FieldValue.arrayUnion(params.id) })

    history.push('/user')
  }

  useEffect(() => {
    firebase.firestore()
      .collection('books')
      .doc(params.id)
      .get()
      .then(book1 => {
        if (book1.exists){
          setBookPrice(book1.data().price)
          setBook([book1.data(), book1.id])
        }
      })

  }, [setBook, setBookPrice])

  return (
    <div className='background flex_center flex_column pt-5 purchase'>
      <div className="purchase-box">

        <div className='purchase__book-info color_dark'>
          <h4 className='purchase__title-book mb-4'>Вы собираетесь купить книгу "{book && book[0].title}"</h4>
          <h6 className='purchase__author-book' >Автора {book && book[0].bookauthor}</h6>
          <div>Сумма к оплате {book && book[0].price} &#8381;</div>
        </div>

        <div className='form-purchase-box'>

          <form className="form-purchase">
            <div className="color_dark mb-3 pur_name pur_input"></div>
            <div className="color_dark mb-3 pur_card-num pur_input"></div>
            <div className="flex_row justify-between">
              <div className="flex_row mt-5">
                <div className="color_dark pur_month pur_input"></div>
                <div className="color_dark pur_year pur_input"></div>
              </div >
              <div className="color_dark mt-5 pur_cvc pur_input"></div>
            </div>
          </form>
        </div >

        <div className='purchase__btn-box'>
          <GooglePayButton
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: 'CARD',
                  parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                  },
                  tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    parameters: {
                      gateway: 'example',
                      gatewayMerchantId: 'exampleGatewayMerchantId',
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: '12345678901234567890',
                merchantName: 'Demo Merchant',
              },
              transactionInfo: {
                totalPriceStatus: 'FINAL',
                totalPriceLabel: 'Total',
                totalPrice: `${bookPrice}`,
                currencyCode: 'RUB',
                countryCode: 'RU',
              },
              shippingAddressRequired: true,
              callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
            }}
            onLoadPaymentData={paymentRequest => {
              console.log('Success', paymentRequest);
            }}
            onPaymentAuthorized={paymentData => {
              console.log('Payment Authorised Success', paymentData)
              return { transactionState: 'SUCCESS' }
            }
            }
            onPaymentDataChanged={paymentData => {
              console.log('On Payment Data Changed', paymentData)
              return {}
            }
            }
            existingPaymentMethodRequired='false'
            buttonColor='white'
            buttonType='Buy'
          />
        </div>

        <div className='purchase__btn-box'>
          <button onClick={buyBook} className='button butlist mr-3 purchase__btn' >Купить</button>
        </div>

      </div>
    </div>
  );
}

export default Purchase;
