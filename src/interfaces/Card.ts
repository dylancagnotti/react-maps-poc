import { TMapWidgetProps } from "../components/MapWidgetOld";
export const CardDimensions = {
  small: {
    width: "250px",
    height: "150px",
  },
  medium: {
    width: "410px",
    height: "230px",
  },
  large: {
    width: "470px",
    height: "250px",
  },
};

export type TCardProps = {
  title: string;
  description: string;
  tags: string[];
  mapdata?: TMapWidgetProps;
  size?: keyof typeof CardDimensions;
};
