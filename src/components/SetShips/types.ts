import { IMainStore } from "../../stores/mainStore";
import { IProps as IAppProps } from "../App/types";

export interface IProps extends IAppProps {
  mainStore?: IMainStore
}