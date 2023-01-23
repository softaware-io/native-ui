import mergeWith from "lodash.mergewith";

const customizer = (objValue: any, srcValue: any) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

export const merge = (...args: any[]) => mergeWith(args, customizer);
