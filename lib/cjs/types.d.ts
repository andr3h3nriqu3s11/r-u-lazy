export declare type LabelSelector = (name: string, prefix?: string, defaultValue?: string) => string;
export declare type StateItem = {
    class: string;
    color?: string;
    icon?: string;
    tooltip?: string;
    text?: string;
};
export declare type StateItems = {
    [key: number]: StateItem;
};
