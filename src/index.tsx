import React from 'react';

export * from './Form';

export function StringEmpty(s: string | null | undefined): boolean {
    return s === null || s === undefined || s === '';
}

/*

Note: keeping this here because it could be useful in the future

let DepThrowErrorBuilder = <T extends unknown>(name: string, dep: string) => {
    let DepThrow: React.FC<T> = () => {
        throw `You can not use ${name} without ${dep} check BuildAll`;
    };
    return DepThrow;
};

*/

/* 

TODO: Some work need to be done to make this useful but it's also a pretty neat function

//TODO: This needs to be refactored so that does not have any dependency on an icons packs
export function StateIcon(props: {
    custom: StateItems;
    state: number;
    style?: React.CSSProperties;
    small?: boolean;
    onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}) {
    let [tooltip, setTooltip] = useState(false),
        { custom, state, onClick } = props,
        style = {
            fontSize: props.small ? '1.4em' : '1.87em',
            ...(props.style ?? {}),
        };

    if (custom && custom[state]) {
        let icon = custom[state];
        style = {
            ...style,
            color: icon.color ?? 'black',
            ...(onClick ? { cursor: 'pointer' } : {}),
        };
        return (
            <span
                onMouseOver={() => setTooltip(true)}
                onMouseLeave={() => setTooltip(false)}
            >
                <div
                    style={{
                        display: tooltip && icon.tooltip ? 'block' : '',
                        marginTop: '0.5em',
                        backgroundColor: '#222d',
                        color: '#fff',
                        maxWidth: '5em',
                    }}
                    className="p-tooltip"
                >
                    {icon.tooltip}
                </div>
                <span
                    onClick={onClick}
                    className={'pi ' + icon.class}
                    style={style}
                >
                    {icon.text ?? ''}
                </span>
            </span>
        );
    }
    return (
        <span
            onClick={onClick}
            className="pi pi-question"
            style={{ color: 'grey', fontSize: '1.83em' }}
        />
    );
} */

interface TreatDateProps {
    date: string;
    extended?: boolean;
    table?: boolean;
    returnString?: boolean;
}

export const treatDate = ({
    date,
    extended = true,
    table = false,
    returnString = false,
}: TreatDateProps) => {
    if (!date || !date.match(/^[\d-]{10}T[\d:]{8}.*/)) return <span></span>;
    let matched = date.match(/^(\d{4})-(\d{2})-(\d{2})T([\d:]{8}).*/);
    if (!matched) return '';
    let formated =
        matched[3] +
        '-' +
        matched[2] +
        '-' +
        matched[1] +
        (extended ? ' ' + matched[4] : ''); //dateformat(date, 'dd-mm-yyyy' + (extended ? ' HH:MM:ss': ''))
    return returnString ? (
        date ? (
            formated
        ) : (
            ''
        )
    ) : !table ? (
        <span
            style={{
                verticalAlign: 'center',
                paddingTop: '.5em',
                paddingBottom: '.5m',
            }}
        >
            {date ? formated : ''}
        </span>
    ) : (
        <p style={{ margin: '0px', textAlign: 'right' }}>
            {date ? formated : ''}
        </p>
    );
};

/**
 * @function treats dates to the some of the iso formats without any timezone information
 * @returns the treated date
 */
export function formatDate(
    date: string | Date,
    widthTime = false,
    end = false
) {
    if (!date) return '';
    let d = new Date(date);
    if (end)
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(d.getDate()).padStart(2, '0')}T23:59:59.000`;
    if (!widthTime)
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(d.getDate()).padStart(2, '0')}T00:00:00.000`;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        '0'
    )}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(
        2,
        '0'
    )}:${String(d.getMinutes()).padStart(2, '0')}:00.000`;
}
