/*
用来根据老的state和指定的action生成并返回新的state的函数
 */
import { combineReducers } from 'redux'

/*
用来管理头部标题的reducer函数
 */
import storageUtils from "../utils/storageUtils"
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CLEAR_CART,
  SET_NUMBER,
  SELECT_PRODUCTS,
  MODIFY_USER
} from './action-types'

const initHeadTitle = ''

function headTitle(state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

/*
用来管理当前登陆用户的reducer函数
 */
const initUser = storageUtils.getUser()

function user(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg
      // state.errorMsg = errorMsg  // 不要直接修改原本状态数据
      return { ...state, errorMsg }
    case RESET_USER:
      return {}
    case MODIFY_USER:
      return action.payload
    default:
      return state
  }
}


const initialState = {
  products: [],
  selectProducts: []
};

function cart(state = initialState, action) {
  let products = [...state.products];
  let hasDouble = false;
  switch (action.type) {
    case ADD_PRODUCT:
      const newProduct = {
        ...action.payload,
        number: 1
      }
      if (products.length) {
        products.forEach((product) => {
          if (product._id === newProduct._id) {
            hasDouble = true;
          }
        })
        if (hasDouble) {
          products.forEach((product) => {
            if (product._id === newProduct._id) {
              product.number += product.number
            }
          })
        } else {
          products = [...products, newProduct];
        }
        return {
          products: products,
        };
      } else {
        return {
          products: [newProduct]
        };
      }
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => (product._id !== action.payload._id))
      }
    case CLEAR_CART:
      return {
        products: []
      }
    case SET_NUMBER:
      let storeProducts = [...state.products];
      storeProducts.forEach((product) => {
        if (product._id === action.payload._id) {
          product.number = action.number
        }
      })
      return {
        products: storeProducts
      }
    case SELECT_PRODUCTS:
      return {
        ...state,
        selectProducts: action.payload
      }

    default:
      return state;
  }
}


function handleRemoveProduct(products, id) {
  const newItem = products.map((item) => {
    if (item.id !== id) {
      return item;
    } else return null;
  })
  return newItem;
}

/*
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构:
  {
    headTitle: '首页',
    user: {}
  }
 */
export default combineReducers({
  headTitle,
  user,
  cart
})