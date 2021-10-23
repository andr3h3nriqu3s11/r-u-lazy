import React, { ReactElement } from 'react';
import { LabelSelector } from '../types';
export interface WraperProps {
    hidden?: boolean;
    label?: string;
    children: ReactElement[] | ReactElement | Element;
    id?: string;
    class?: string;
    gridless?: boolean;
    reversed?: boolean;
}
export declare const WraperBuilder: (ls: LabelSelector) => React.FC<WraperProps>;
