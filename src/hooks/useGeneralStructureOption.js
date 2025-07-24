import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGeneralStructuresAll } from "../store/slices/questionnaire";


const useStructureOption = () => {
  const dispatch = useDispatch();

  const generalStructuresAll = useSelector(
    (state) => state.questionnaire.generalStructuresAll
  );

  useEffect(() => {
    dispatch(getGeneralStructuresAll());
  }, [dispatch]);

  const processDataRecursively = (items) => {
    return items?.map((item, index) => ({
      title: item.name,
      key: item?.id,
      value: item.id,
      children: item.children
        ? processDataRecursively(item.children)
        : [],
    }));
  };
  const generalStructureOption = processDataRecursively(generalStructuresAll);

  return {
    generalStructureOption,
  };
};

export default useStructureOption;
