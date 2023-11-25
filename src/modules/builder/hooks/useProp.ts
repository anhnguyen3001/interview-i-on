import { useDispatch, useSelector } from "react-redux";
import { builderActions, selectPropValue } from "../builderSlice";
import { useInternalNode } from "../contexts";

export const useProp = (propKey: string) => {
  const { id } = useInternalNode();
  const dispatch = useDispatch();

  const value = useSelector((state) => selectPropValue(state, id, propKey));

  const setProp = (value: any) => {
    dispatch(
      builderActions.setProp({
        id,
        propKey,
        value,
      })
    );
  };

  return [value, setProp];
};
