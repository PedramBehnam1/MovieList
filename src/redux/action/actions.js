import { useCallback } from "react";
import { shallowEqual , useDispatch , useSelector} from "react-redux";

export function useDispatchToProps(type) {
  const dispatch = useDispatch();
  const handleDispatch = (paylod)=>{
   dispatch({type , paylod})
  }
  return useCallback(handleDispatch , [type , dispatch]);
}


export function useStateToProps(selection,equality = shallowEqual){
 return useSelector(selection,equality);
}