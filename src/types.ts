export type LabelSelector = (
    name: string,
    prefix?: string,
    defaultValue?: string
) => string;

export type StateItem = {
    class: string;
    color?: string;
    icon?: string;
    tooltip?: string;
    text?: string;
};
export type StateItems = { [key: number]: StateItem };
