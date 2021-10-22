import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Messages } from 'primereact/messages';
import React, { ReactElement } from 'react';
import type {
    DataTableArgumentAdvacend,
    DataTableArgumentElement,
    DataTableArgumentElementButton,
    DataTableArgumentElementComplex,
    DataTableArgumentElementDate,
    DataTableArgumentElementDi,
    DataTableArgumentElementDialog,
    DataTableArgumentElementGeneric,
    DataTableArgumentElementMap,
    DataTableArgumentElementState,
    DataTableArgumentElementURL,
    GenericRequeridModel,
    QueryParam,
} from '../../types';
import { aclItem, checkLoginACL, pair, StateIcon } from '../Generic';
import { g_formMaper, g_getDateTemplate, g_openWindowDialog, g_pair, g_template_button, g_template_dialog, g_treatDate, ls } from '../GenericFunctions';
import { g_clear, g_filter, g_getHeaderTemplateNull, g_hideSearch, g_page, g_showSearch, g_sort } from './DataTable';

/**
 * @function g_dataTable returns a <DataTable>
 */
export function g_dataTable<T = any>(
    context: React.Component & { getData: () => void; state: GenericRequeridModel<any> },
    header: ReactElement | null,
    e: DataTableArgumentElementComplex<T> | DataTableArgumentElement<T>[],
    callback: () => void = () => {},
    ad: DataTableArgumentAdvacend = { enabled: false }
) {
    let tToF: { [key: number]: any } = {},
        dates: any[] = [],
        tToA = {},
        tToR = {},
        {
            body = [],
            first = context.state.first,
            pageSize = context.state.pageSize,
            recordsTotal = null,
            pageTotal = null,
            filterD = null,
            multiSortMeta = null,
            data = null,
        } = e as DataTableArgumentElementComplex<T>;
    if (!(e as DataTableArgumentElementComplex<T>).body) body = e as DataTableArgumentElement<T>[];
    //TODO: Remove type
    let type = (e: DataTableArgumentElement<T>) => (e as any).type ?? e.t;
    if (data === null) data = context.state.data;
    if (data === null) data = [];

    if (ad.enabled) {
        let { id, filterbtt } = ad;
        let addfiled = ad.addfiled ? <Button icon="pi pi-plus" onClick={ad.addfiled} style={{ float: 'right', marginLeft: '3px' }} /> : <span />;

        if (!id) id = 'datatable';

        let filterF = (a: any) => (a.filter && (a.c ?? true)) || a.adfilter || type(a) === 'spacer';
        let bodyF = body.filter(filterF);

        //TODO: remove as any
        let dTypes: any = ad.dTypes ?? [bodyF.map(e => (type(e) === 'date' ? 'date' : type(e) === 'state' ? 'drop' : type(e) === 'spacer' ? 'spacer' : 't'))];
        //TODO: remove as any
        let filter: any = ad.filter ?? [bodyF.map(e => e?.data ?? '')];
        //TODO: remove as any
        let cc: any = ad.cc ?? [bodyF.map(e => (type(e) === 'date' ? '3 p-fluid' : type(e) === 'spacer' ? `${e.space ?? '1'} p-fluid` : '2 p-fluid'))];

        let l = ad.l ?? [
            [
                ...bodyF
                    .map((a, i) => ({ a: a, i: i }))
                    .filter(a => a.a.title)
                    .map(a => ({ [a.i]: a.a.title })),
                {},
            ].reduce((a, b) => ({ ...a, ...b })),
        ];

        let options = ad.options ?? [
            [
                ...body
                    .filter(filterF)
                    .map((a, i) => ({ a: a as DataTableArgumentElementState, i: i }))
                    .filter(a => type(a.a) === 'state')
                    .map((a: { a: DataTableArgumentElementState; i: number }) => {
                        let states = typeof a.a.states === 'function' ? a.a.states() : a.a.states;
                        return {
                            [a.i]: Object.keys(states)
                                .filter(a => !isNaN(Number(a)))
                                .map(a => ({ ...states[Number(a)], label: states[Number(a)].tooltip ?? a, value: a })),
                        };
                    }),
                {},
            ].reduce((a, b) => ({ ...a, ...b })),
        ];

        let ranges =
            ad.ranges ??
            [
                ...(body as DataTableArgumentElementDate[])
                    .filter(a => a.filter && type(a) === 'date')
                    .map(a => ({
                        [a.data]: [],
                    })),
                {},
            ].reduce((a, b) => ({ ...a, ...b }));

        let handleChange = ad.handleChange ?? [
            body.filter(filterF).map(a => {
                let name = a.data;
                if (type(a) === 'date') {
                    return (ev: any) => {
                        //TODO: remove as any
                        //TODO: remove as any
                        //TODO: remove as any
                        if ((((context.state as any).rangeDates ?? {}) as any)[name as any]) {
                            //TODO: remove as any
                            let toSetR = (context.state as any).rangeDates;
                            if (!Array.isArray(ev.value)) return;
                            //TODO: remove as string
                            toSetR[name as string] = ev.value;
                            let [a, b] = ev.value;
                            if (a && b) {
                                let toSet = [
                                    ...context.state.filter.filter(e => e.key !== name && e.key !== name + 'Start' && e.key !== name + 'End'),
                                    g_pair(name + 'Start', g_treatDate(ev.value[0], false)),
                                    g_pair(name + 'End', g_treatDate(ev.value[1], false, true)),
                                ];
                                context.setState({ rangeDates: toSetR, filter: toSet }, () => {
                                    //TODO: remove as any
                                    //TODO: remove as any
                                    if ((context as any).filtertimeout) clearTimeout((context as any).filtertimeout);
                                    //TODO: remove as any
                                    (context as any).filtertimeout = setTimeout(() => {
                                        //TODO: remove as any
                                        (context as any).filtertimeout = null;
                                        callback();
                                    }, 3000);
                                });
                            } else context.setState({ rangeDates: toSetR });
                        } else {
                            //TODO: remove as any
                            let toSet = (context.state as any).rangeDates ?? {};
                            //TODO: remove as string
                            toSet[name as string] = ev.value;
                            context.setState({ rangeDates: toSet });
                        }
                    };
                } else {
                    return (ev: any) =>
                        context.setState({ filter: [...context.state.filter.filter(e => e.key !== a.data), { key: a.data, value: (ev?.target?.value ?? '') + '' }] }, () => {
                            //TODO: remove as any
                            //TODO: remove as any
                            if ((context as any).filtertimeout) clearTimeout((context as any).filtertimeout);
                            //TODO: remove as any
                            (context as any).filtertimeout = setTimeout(() => {
                                //TODO: remove as any
                                (context as any).filtertimeout = null;
                                callback();
                            }, 3000);
                        });
                }
            }),
        ];

        //TODO: remove as any
        let origin: any = context.state.filter.map(a => ({ [a.key]: a.value }));

        //TODO: remove as any
        //TODO: remove as any
        origin = origin.length === 0 ? {} : origin.reduce((a: any, b: any) => ({ ...a, ...b }));

        if (filterbtt) {
            dTypes = [...dTypes, ['spacer', 'btt']];
            cc = [...cc, ['11', '1']];
            filter = [...filter, ['', '']];
            l = [...l, ['', ls('submit', 'btt')]];
        }

        header = (
            <>
                <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>
                    {ad.addon}
                    {addfiled}
                    <Button
                        icon="pi pi-search"
                        onClick={e => {
                            e.preventDefault();
                            //TODO: Remove as any
                            //TODO: Remove as any
                            let toSet: { [key: string]: any } = {};
                            //TODO: Remove as any
                            //TODO: Remove as any
                            //TODO: Remove as any
                            toSet[id as any] = !(context.state as any)[id as any];
                            context.setState(toSet);
                        }}
                        style={{ float: 'right', marginLeft: '3px' }}
                    />
                    <Button
                        icon="pi pi-refresh"
                        onClick={e => {
                            e.preventDefault();
                            g_clear(context, callback);
                        }}
                        style={{ float: 'right', marginLeft: '3px' }}
                    />
                </div>
                {(context.state as any)[id] ? (
                    <div className="p-col-12">
                        {g_formMaper(
                            context,
                            [
                                {
                                    t: 'array',
                                    filter,
                                    dTypeFs: dTypes,
                                    cc,
                                    l,
                                    class: ad.class ?? {},
                                    //TODO: remove as any
                                    origin: { ...origin, ...ranges, ...((context.state as any).rangeDates ?? {}) },
                                    selectionMode: { _: 'range' },
                                    options,
                                    handleChange,
                                    showClear: { _: true },
                                    //TODO: remove as any
                                    click: (e: any) => {
                                        //TODO: remove as any
                                        //TODO: remove as any
                                        if ((context as any).filtertimeout) clearTimeout((context as any).filtertimeout);
                                        e.preventDefault();
                                        callback();
                                    },
                                    template: {
                                        //TODO: remove as any
                                        _: (i: any) => (
                                            <div className="p-clearfix">
                                                <span className={'pi ' + i.class} style={{ color: i.color, fontSize: '1.2em' }}></span>
                                                <span style={{ margin: '.5em .25em 0 0', marginLeft: '.5em' }}>{i.label}</span>
                                            </div>
                                        ),
                                    },
                                },
                            ],
                            false,
                            '2'
                        )}
                    </div>
                ) : null}
            </>
        );
    } else if (header === null) header = g_getHeaderTemplateNull(context, context.getData);
    if ((context.state.pageNumber ?? 1) !== 1 && data.length === 0) context.setState({ pageNumber: 1 }, callback);
    let remove = 0;
    return (
        <DataTable
            autoLayout={true}
            header={header}
            first={first}
            rows={ad.noPaging ? undefined : pageSize}
            totalRecords={recordsTotal ? recordsTotal : context.state.recordsTotal}
            footer={
                ad.noPaging ? null : (recordsTotal ? recordsTotal : context.state.recordsTotal) === 0 ? <span style={{ color: 'grey', fontSize: '1' }}>Sem Resultados</span> : null
            }
            onPage={e => g_page(e, context, callback)}
            paginator={ad.noPaging ? false : (pageTotal ? pageTotal : context.state.pageTotal) > 1}
            filters={filterD ? filterD : context.state.filterD}
            //TODO: remove as any
            onFilter={e => g_filter(context, callback, tToF, tToA, tToR, dates as any, e as any)}
            lazy={true}
            onSort={e => g_sort(e, context, callback)}
            multiSortMeta={multiSortMeta ? multiSortMeta : context.state.multiSortMeta}
            sortMode="multiple"
            value={data}
            responsive={true}
        >
            {body.map((ie, i) => {
                let type = (ie as any).type ?? ie.t;
                if (ie.onlyFilter) return null;
                if (!type) return ie;
                if (ie.c !== null && ie.c !== undefined && !ie.c) {
                    remove++;
                    return null;
                }

                let title = ie.title === '' ? '' : ie.title ? ie.title : ls(ie.data);
                let filter = (ie.filter ?? false) && !ad.enabled;

                let trimLimit = ie.dataTrimLimit ?? 200;

                //TODO: remove as any
                //TODO: remove as any
                let dataMap = (a: any, row: any, trim: boolean = false) => {
                    if (trim) {
                        if ((a ?? false) !== false) {
                            a = String(a);
                            return a.length >= trimLimit ? a.substr(0, trimLimit) + '...' : a;
                        }
                    }
                    return (ie.dataMap ?? (a => a))(a, row);
                };

                //TODO: remove as any
                //TODO: remove as any
                let data = (r: { [key: string]: any }) => r[ie.data as string];

                if (filter && ie.data) {
                    tToF[i - remove] = ie.data;
                }
                if (type === 'spacer') {
                    return null;
                } else if (type === 'd') {
                    let e = ie as DataTableArgumentElementGeneric;
                    return (
                        <Column
                            key={i}
                            style={e.style}
                            field={e.data}
                            filter={filter}
                            sortable={e.sortable}
                            header={title}
                            body={(row: any) => (
                                <p style={{ margin: '0px', textAlign: e.align ?? typeof data(row) === 'string' ? 'left' : 'right' }}>
                                    {e.html ? <div dangerouslySetInnerHTML={dataMap(data(row), row, true)}></div> : dataMap(data(row), row, true)}
                                </p>
                            )}
                        />
                    );
                } else if (type === 'di') {
                    let e = ie as DataTableArgumentElementDi<T>;
                    //TODO: remove as any
                    return (
                        <Column
                            key={i}
                            style={ie.style}
                            field={ie.data}
                            filter={filter}
                            sortable={e.sortable}
                            header={title}
                            body={(row: any) => <p style={{ margin: '0px', textAlign: (e.align as any) ?? 'right' }}>{dataMap(e.di(row), row)}</p>}
                        />
                    );
                } else if (type === 'date') {
                    let e = ie as DataTableArgumentElementDate;
                    if (filter && ie.data) {
                        dates.push(i - remove);
                    }
                    //TODO: remove as any
                    let d = (row: any) => g_getDateTemplate(row[e.data], e.extended, true);
                    //TODO: remove as any
                    //TODO: remove as any
                    return (
                        <Column
                            key={i}
                            style={ie.style}
                            field={ie.data}
                            filter={filter}
                            sortable={e.sortable}
                            header={title}
                            body={(row: any) => dataMap(e.di ? (e.di as any)(d(row), row) : d(row), row)}
                        />
                    );
                } else if (type === 'state') {
                    let e = ie as DataTableArgumentElementState;
                    //TODO: remove as any
                    return (
                        <Column
                            key={i}
                            style={{ width: '4em', ...ie.style }}
                            field={ie.data}
                            filter={filter}
                            sortable={e.sortable}
                            header={title === 'LabelInfenranceFailed' ? ls('state', 'dataTableGeneric') : title}
                            body={(row: any) => (
                                <p style={{ margin: '0px', textAlign: 'center' }}>
                                    {dataMap(
                                        <StateIcon
                                            state={row[e.data]}
                                            style={{ fontSize: e.stateSize ?? '1.87em' }}
                                            custom={typeof e.states === 'function' ? e.states(row) : e.states}
                                        />,
                                        row
                                    )}
                                </p>
                            )}
                        />
                    );
                } else if (type === 'button' || type === 'btt') {
                    let e = ie as DataTableArgumentElementButton<T>;
                    //TODO: remove as any
                    //TODO: remove as any
                    return (
                        <Column
                            key={i}
                            style={{ width: '5em', ...ie.style }}
                            header={title === 'LabelInfenranceFailed' ? '' : title}
                            body={(raw: any) => (
                                <p style={{ margin: '0px', textAlign: 'center' }}>
                                    {dataMap(
                                        g_template_button(
                                            e.label,
                                            e.icon,
                                            e.show ? e.show(raw) : false,
                                            ((ev: any) => e.click(raw, ev)) as any,
                                            false,
                                            e.extra,
                                            e.class,
                                            e.tooltip
                                        ),
                                        raw
                                    )}
                                </p>
                            )}
                        />
                    );
                } else if (type === 'map') {
                    let e = ie as DataTableArgumentElementMap;
                    //TODO: remove as any
                    let data = (row: any) => e.objs[row[e.data]];
                    //TODO: remove as any
                    return (
                        <Column
                            key={i}
                            style={ie.style}
                            field={ie.data}
                            filter={filter}
                            sortable={e.sortable}
                            header={title}
                            body={(row: any) => <p style={{ margin: '0px', textAlign: e.align ?? typeof data(row) === 'string' ? 'left' : 'right' }}>{dataMap(data(row), row)}</p>}
                        />
                    );
                } else if (type === 'dil') {
                    let e = ie as DataTableArgumentElementDialog;
                    //TODO: remove as any
                    return (
                        <Column
                            key={i}
                            style={{ width: '5em', ...ie.style }}
                            header={title === 'LabelInfenranceFailed' ? '' : title}
                            body={(raw: any) => (
                                <p style={{ margin: '0px', textAlign: 'center' }}>
                                    {dataMap(
                                        g_template_dialog(
                                            context,
                                            e.text,
                                            e.id(raw),
                                            (ev: any) => e.onConfirm(raw, ev),
                                            e.label,
                                            e.show ? e.show(raw) : false,
                                            e.disabled,
                                            e.classBttConfirm,
                                            e.classBttDeny,
                                            e.iconBttConfirm,
                                            e.iconBttDeny,
                                            e.class,
                                            e.buttonClassName,
                                            e.confirmText,
                                            e.denyText,
                                            e.icon
                                        ),
                                        raw
                                    )}
                                </p>
                            )}
                        />
                    );
                } else if (type === 'url') {
                    let e = ie as DataTableArgumentElementURL<T>;
                    //TODO: remove as any
                    //TODO: remove as any
                    //TODO: remove as any
                    //TODO: remove as any
                    //TODO: remove as any
                    return (
                        <Column
                            key={i}
                            style={{ width: '5em', ...ie.style }}
                            header={title === 'LabelInfenranceFailed' ? '' : title}
                            body={(raw: any) => (
                                <p style={{ margin: '0px', textAlign: 'center' }}>
                                    {dataMap(
                                        g_template_button(
                                            '',
                                            e.icon ? e.icon : 'pi pi-pencil',
                                            false,
                                            (() => g_openWindowDialog(e.url(raw), raw.idUUID ? raw.idUUID : '_blank', e.width, e.height, 'off', '', e.callback as any)) as any,
                                            false,
                                            '',
                                            e.class ?? 'p-button-warning',
                                            e.tooltip
                                        ),
                                        raw
                                    )}
                                </p>
                            )}
                        />
                    );
                } else return ie;
            })}
        </DataTable>
    );
}

export type TablePagePropsHeader = ((c: TablePage, e: any) => ReactElement | null) | null;
//TODO: Probalby make genric
export type TablePagePropsGetData = (c: TablePage) => Promise<void> | void;
//TODO: Remove tooltip*
export type TablePagePropsGetTable<T> = (c: TablePage, e: aclItem, tooltipFs: any, tooltipOver: any, tooltipLeave: any) => DataTableArgumentElement<T>[];
export type TablePageProps<T, Y> = {
    header: TablePagePropsHeader;
    getData: TablePagePropsGetData;
    table: TablePagePropsGetTable<T>;
    setup?: (c: TablePage) => void;
    update?: (c: TablePage) => void;
    checkAcl?: boolean;
    fakename?: string;
    hidden?: (c: TablePage) => boolean;
    title?: ((c: TablePage) => string) | string;
    addon?: (c: TablePage, e: aclItem) => ReactElement;
    ad?: DataTableArgumentAdvacend;
    rg?: QueryParam<string>[];
    stateE?: Y;
    doNotHideSearch?: boolean;
};
export class TablePage<T = any, Y = any> extends React.Component<TablePageProps<T, Y>, GenericRequeridModel<T> & Y> {
    constructor(props: TablePageProps<T, Y>) {
        super(props);
        this.state = { ...g_genericRequired<T>(props.rg ?? [pair('dateCreation', 'desc')]), ...(props.stateE ?? ({} as Y)) };
    }
    componentDidMount() {
        if (!this.props.doNotHideSearch) g_hideSearch();
        else g_showSearch();
        if (typeof this.props.setup === 'function') this.props.setup(this);
        this.props.getData(this);
    }
    componentDidUpdate() {
        if (typeof this.props.update === 'function') this.props.update(this);
    }

    //TODO: to remove
    tooltipFs = () => {};
    //TODO: to remove
    tooltipOver = () => {};
    //TODO: to remove
    tooltipLeave = () => {};

    getData: () => void = () => this.props?.getData(this);
    messages: Messages | null = null;

    render(): JSX.Element | null {
        let { error, profile } = checkLoginACL({ checkPageAcl: this.props.checkAcl ?? true, fakename: this.props.fakename });
        if (error) return error;
        return !(this.props.hidden ?? (() => false))(this) ? (
            <div className="card">
                <Messages ref={e => (this.messages = e)} />
                {(() => (this.props.title ? <h1>{typeof this.props.title === 'function' ? this.props.title(this) : this.props.title}</h1> : null))()}
                {this.props.addon ? this.props.addon(this, profile!) : null}
                {g_dataTable(
                    this,
                    this.props.header ? this.props.header(this, profile!) : null,
                    this.props.table(this, profile!, this.tooltipFs, this.tooltipOver, this.tooltipLeave),
                    this.getData,
                    this.props.ad ?? undefined
                )}
            </div>
        ) : null;
    }
}

export function g_genericRequired<T>(orderBy: QueryParam<string>[] = [{ key: 'dateCreation', value: 'desc' }]): GenericRequeridModel<T> {
    return {
        filter: [] as QueryParam<string>[],
        filterD: {},
        orderBy: orderBy,
        dOrderBy: orderBy,
        pageNumber: 1,
        multiSortMeta: [] as any[],
        first: 0,
        pageSize: 10,
        pageTotal: 0,
        recordsTotal: 0,
        data: [] as T[],
    };
}
