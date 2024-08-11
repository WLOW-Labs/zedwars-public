import { ConfigVariable } from "../sdk/arg_types";

export interface ConfigItem {
    name: string,
    key: ConfigVariable,
    value: number,
}