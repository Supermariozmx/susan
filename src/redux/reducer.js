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
  LOAD_CART,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CHANGE_PRODUCT_QUANTITY
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
    default:
      return state
  }
}


const initialState = {
  products: []
};

function cart(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        products: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        productToAdd: Object.assign({}, action.payload),
        products: [...state.products].concat(action.payload)
      };
    case REMOVE_PRODUCT:
      // const newItem =  state.products.map((item)=>{
      //   if(item.id!==action.id){
      //     return item
      //   }
      // })

      // return {
      //   ...state,
      //   productToRemove: Object.assign({}, action.payload),
      //   products: newItem
      // };
      return {
        ...state,
        products: handleRemoveProduct(state.products, action.id)
      }

    case CHANGE_PRODUCT_QUANTITY:
      return {
        ...state,
        productToChange: Object.assign({}, action.payload)
      };
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