import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Messages } from 'primereact/messages';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import React from 'react';
import { LabelSelector, g_checkLoginACL, g_getDateTemplate, StateIcon, g_openWindowDialog, g_pair, g_template_button, g_template_dialog } from '../GenericFunctions';
import { g_genericRequired } from './DataTableNew';
export { TablePage, g_dataTable, g_genericRequired } from './DataTableNew';

/**
 * @function g_filter filter datatable data
 * @param contex React native context(this), requires that "filters"(api data) be set as contex.state.filter
 * @param {Function} callbackLoadData function gets data from api NOTE: this function must set as ***** = async() => {*****}
 * @param tToF a dictionary where de key is the index of the table field and the value is the api filter key
 * @param tToA a dictionary where de key is the index of the table field and the value is value to add at the end
 * @param tToR a dictionary where de key is the index of the table field and the value is value to regex
 * @param {[]} dates an array with the indexes of the dates fileds will automaticly set date filter under tToF just set the filter ket without Start/End
 */
export function g_filter(context, callbackLoadData, tToF, tToA = {}, tToR = {}, dates = [], e = null) {
    if (!e) return;
    context.setState({ filterD: e.filters }, () => {
        let filters = [];
        let d = document.getElementsByClassName('p-filter-column');
        for (let i = 0; i < d.length; i++) {
            if (d[i].children[0] && d[i].children[0].outerHTML.startsWith('<input') && d[i].children[0].value !== '') {
                if (dates.indexOf(i) !== -1) {
                    let temp = d[i].children[0].value;
                    if (temp && !temp.match(/^\d{2}[-/]?$|^\d{2}[-/](0[1-9]|1[0-2])[-/]?$|^\d{2}[-/](0[1-9]|1[0-2])[-/]\d{4}$/g)) continue;
                    temp = temp.replace(/\//g, '-');
                    let basemin, basemax;
                    if (temp.length <= 3 && temp.length >= 2) {
                        basemin = '0000-00-' + temp.match(/^\d{2}/)[0] + 'T00:00:00.000Z';
                        basemax = '9999-12-' + temp.match(/^\d{2}/)[0] + 'T23:59:59.999Z';
                    } else if (temp.length <= 6 && temp.length >= 5) {
                        basemin = '0000-' + temp.match(/^\d{2}-(\d{2})/)[1] + '-' + temp.match(/^\d{2}/)[0] + 'T00:00:00.000Z';
                        basemax = '9999-' + temp.match(/^\d{2}-(\d{2})/)[1] + '-' + temp.match(/^\d{2}/)[0] + 'T23:59:59.999Z';
                    } else if (temp.length === 10) {
                        basemin = temp.match(/^\d{2}-\d{2}-(\d{4})/)[1] + '-' + temp.match(/^\d{2}-(\d{2})/)[1] + '-' + temp.match(/^\d{2}/)[0] + 'T00:00:00.000Z';
                        basemax = temp.match(/^\d{2}-\d{2}-(\d{4})/)[1] + '-' + temp.match(/^\d{2}-(\d{2})/)[1] + '-' + temp.match(/^\d{2}/)[0] + 'T23:59:59.999Z';
                    } else continue;
                    filters.push({ key: tToF[i] + 'Start', value: basemin });
                    filters.push({ key: tToF[i] + 'End', value: basemax });
                } else if (!(tToR[i] && !d[i].children[0].value.match(tToR[i]))) filters.push({ key: tToF[i], value: d[i].children[0].value + (tToA[i] ? tToA[i] : '') });
            }
        }
        context.setState({ filter: filters, pageNumber: 1 });
        if (context.filtertimeout) clearTimeout(context.filtertimeout);
        context.filtertimeout = setTimeout(() => {
            callbackLoadData();
            context.filtertimeout = null;
        }, 1000);
    });
}

/**
 * @function g_page handles onPage event from datatable
 * @param event onPage event
 * @param contex React native context(this), requires that "pageNumber"(api data) be set as contex.state.pageNumber and "first"(datatable) be set as contex.state.first
 * @param {Function} callbackLoadData function gets data from api NOTE: this function must set as ***** = async() => {*****}
 */
export function g_page(event, context, callbackLoadData) {
    let page = event.page + 1;
    context.setState(
        {
            pageNumber: page,
            first: event.first,
        },
        callbackLoadData
    );
}

/**
 * @function g_page_hook handles onPage event from datatable
 * @param event onPage event
 * @param contex React native context(this), requires that "pageNumber"(api data) be set as contex.state.pageNumber and "first"(datatable) be set as contex.state.first
 * @param {Function} callbackLoadData function gets data from api NOTE: this function must set as ***** = async() => {*****}
 */
export function g_page_hook(e, [data, setData], callbackLoadData) {
    console.log(e);
    let page = e.page + 1;
    setData({
        ...data,
        pageNumber: page,
        first: e.first,
    });
    callbackLoadData();
}

/**
 * @function g_sort handles onSort event from datatable
 * @param event onSort event
 * @param contex React native context(this), requires that "orderBy"(api data) be set as contex.orderBy and "multiSortMeta"(datatable) be set as contex.state.multiSortMeta
 * @param {Function} callbackLoadData function gets data from api NOTE: this function must set as ***** = async() => {*****}
 */
export function g_sort(event, context, callbackLoadData) {
    let field = event.multiSortMeta[0].field;
    let order = event.multiSortMeta[0].order;
    let multiSortMeta = context.state.multiSortMeta;
    let update = false;
    multiSortMeta.forEach(a => {
        if (a.field === field) {
            update = true;
            a.order = order;
        }
    });
    if (!update) multiSortMeta.push({ field: field, order: -order });
    let orderBy = [];
    multiSortMeta.forEach(a => {
        orderBy.push({ key: a.field, value: a.order === 1 ? 'asc' : 'desc' });
    });
    context.setState({ multiSortMeta: multiSortMeta, orderBy: orderBy }, callbackLoadData);
}

/**
 * @function clears all fields and order and getdata
 * @param contex React native context(this), requires that "orderBy"(api data) be set as contex.orderBy, "multiSortMeta"(datatable) be set as contex.state.multiSortMeta, requires that "pageNumber"(api data) be set as contex.state.pageNumber and requires that "filters"(api data) be set as contex.state.filter
 * @param callbackLoadData
 */
export function g_clear(context, callbackLoadData) {
    let cf = document.getElementsByClassName('p-filter-column');
    for (let i = 0; i < cf.length; i++) {
        if (cf[i].children[0]) cf[i].children[0].value = '';
    }
    let orderBy = [];
    if (context.state.dOrderBy) orderBy = context.state.dOrderBy;
    if (context.state.rangeDates) context.setState({ rangeDates: [] });
    context.setState({ filter: [], multiSortMeta: [], pageNumber: 1, orderBy: orderBy, first: 0 }, callbackLoadData);
}

/**
 * @function g_template_dataTable returns a <DataTable>
 */
export function g_template_dataTable(context, header, e, functioncallback = null, tToF = {}, dates = [], tToA = {}, tToR = {}) {
    let { body = [], first = null, pageSize = null, recordsTotal = null, pageTotal = null, filterD = null, multiSortMeta = null, data = null } = e;
    if (!e.body) body = e;
    if (header === null) header = g_getHeaderTemplateNull(context, functioncallback);
    if (data === null) data = context.state.data;
    if (data === null) data = [];
    if (functioncallback === null) functioncallback = () => {};
    if ((context.state.pageNumber ?? 1) !== 1 && data.length === 0) context.setState({ pageNumber: 1 }, functioncallback);
    let remove = 0;
    return (
        <DataTable
            autoLayout={true}
            header={header}
            first={first ? first : context.state.first}
            rows={pageSize ? pageSize : context.state.pageSize}
            totalRecords={recordsTotal ? recordsTotal : context.state.recordsTotal}
            footer={(recordsTotal ? recordsTotal : context.state.recordsTotal) === 0 ? <span style={{ color: 'grey', fontSize: '1' }}>Sem Resultados</span> : null}
            onPage={e => g_page(e, context, functioncallback)}
            paginator={(pageTotal ? pageTotal : context.state.pageTotal) > 1}
            filters={filterD ? filterD : context.state.filterD}
            onFilter={e => g_filter(context, functioncallback, tToF, tToA, tToR, dates, e)}
            lazy={true}
            onSort={e => g_sort(e, context, functioncallback)}
            multiSortMeta={multiSortMeta ? multiSortMeta : context.state.multiSortMeta}
            sortMode="multiple"
            value={data}
            responsive={true}
        >
            {body.map((e, i) => {
                if (!e?.type) return e;
                if (e.c !== null && e.c !== undefined && !e.c) {
                    remove++;
                    return null;
                }
                let title = e.title === '' ? '' : e.title ? e.title : LabelSelector(e.data);
                let trimLimit = e.dataTrimLimit ?? 200;
                let data = row => {
                    let data = row[e.data];
                    if ((data ?? false) !== false) {
                        data = String(row[e.data]);
                        return data?.length >= trimLimit ? data.substr(0, trimLimit) + '...' : data;
                    }
                    return data;
                };
                if (e.filter && e.data) {
                    tToF[i - remove] = e.data;
                }
                if (e.type === 'd') {
                    return (
                        <Column
                            key={i}
                            style={e.style}
                            field={e.data}
                            filter={e.filter}
                            sortable={e.sortable}
                            header={title}
                            body={row => <p style={{ margin: '0px', textAlign: e.align ? e.align : typeof row[e.data] === 'string' ? 'left' : 'right' }}>{data(row)}</p>}
                        />
                    );
                } else if (e.type === 'di') {
                    return (
                        <Column
                            key={i}
                            style={e.style}
                            field={e.data}
                            filter={e.filter}
                            sortable={e.sortable}
                            header={title}
                            body={row => <p style={{ margin: '0px', textAlign: e.align ?? 'right' }}>{e.di(row)}</p>}
                        />
                    );
                } else if (e.type === 'date') {
                    if (e.filter && e.data) {
                        dates.push(i - remove);
                    }
                    let d = row => g_getDateTemplate(row[e.data], e.extended, true);
                    return (
                        <Column key={i} style={e.style} field={e.data} filter={e.filter} sortable={e.sortable} header={title} body={row => (e.di ? e.di(d(row), row) : d(row))} />
                    );
                } else if (e.type === 'state') {
                    return (
                        <Column
                            key={i}
                            style={{ width: '4em', ...e.style }}
                            field={e.data}
                            filter={e.filter}
                            sortable={e.sortable}
                            header={title === 'LabelInfenranceFailed' ? LabelSelector('state', 'dataTableGeneric') : title}
                            body={row => (
                                <p style={{ margin: '0px', textAlign: 'center' }}>
                                    <StateIcon
                                        state={row[e.data]}
                                        style={{ fontSize: e.stateSize ? e.stateSize : '1.87em' }}
                                        custom={typeof e.states === 'function' ? e.states(row) : e.states}
                                    />
                                </p>
                            )}
                        />
                    );
                } else if (e.type === 'button' || e.type === 'btt') {
                    return (
                        <Column
                            key={i}
                            style={{ width: '5em', ...e.style }}
                            header={title === 'LabelInfenranceFailed' ? '' : title}
                            body={raw => (
                                <p style={{ margin: '0px', textAlign: 'center' }}>
                                    {g_template_button('', e.icon, e.show ? e.show(raw) : false, ev => e.click(raw, ev), false, e.extra ?? 'p-col-12', e.class, e.tooltip)}
                                </p>
                            )}
                        />
                    );
                } else if (e.type === 'map') {
                    let data = row => e.objs[row[e.data]];
                    return (
                        <Column
                            key={i}
                            style={e.style}
                            field={e.data}
                            filter={e.filter}
                            sortable={e.sortable}
                            header={title}
                            body={row => <p style={{ margin: '0px', textAlign: e.align ? e.align : typeof data(row) === 'string' ? 'left' : 'right' }}>{data(row)}</p>}
                        />
                    );
                } else if (e.type === 'dil') {
                    return (
                        <Column
                            key={i}
                            style={{ width: '5em', ...e.style }}
                            header={title === 'LabelInfenranceFailed' ? '' : title}
                            body={raw => (
                                <p style={{ margin: '0px', textAlign: 'center' }}>
                                    {g_template_dialog(
                                        context,
                                        e.text,
                                        e.id(raw),
                                        ev => e.onConfirm(raw, ev),
                                        e.label,
                                        e.show ? e.show(raw) : false,
                                        e.disabled,
                                        e.classBttConfirm,
                                        e.classBttDeny,
                                        e.iconBttConfirm,
                                        e.iconBttDeny,
                                        e.class ?? 'p-col-12',
                                        e.buttonClassName,
                                        e.confirmText,
                                        e.denyText,
                                        e.icon
                                    )}
                                </p>
                            )}
                        />
                    );
                } else if (e.type === 'url') {
                    return (
                        <Column
                            key={i}
                            style={{ width: '5em', ...e.style }}
                            header={title === 'LabelInfenranceFailed' ? '' : title}
                            body={raw => (
                                <p style={{ margin: '0px', textAlign: 'center' }}>
                                    {g_template_button(
                                        '',
                                        e.icon ? e.icon : 'pi pi-pencil',
                                        false,
                                        () => g_openWindowDialog(e.url(raw), raw.idUUID ? raw.idUUID : '_blank', e.width, e.height, 'off', '', e.callback),
                                        false,
                                        '',
                                        e.class ?? 'p-button-warning',
                                        e.tooltip
                                    )}
                                </p>
                            )}
                        />
                    );
                } else return e;
            })}
        </DataTable>
    );
}

export function g_hideSearch() {
    let cf = document.getElementsByClassName('p-filter-column');
    for (let i = 0; i < cf.length; i++) {
        cf[i].style.setProperty('display', 'none');
    }
}

export function g_showSearch() {
    let cf = document.getElementsByClassName('p-filter-column');
    for (let i = 0; i < cf.length; i++) {
        cf[i].style.setProperty('display', '');
    }
}

export function g_toggleSearch() {
    let cf = document.getElementsByClassName('p-filter-column');
    for (let i = 0; i < cf.length; i++) {
        cf[i].style.setProperty('display', cf[i].style.display === 'none' ? '' : 'none');
    }
}

export function g_getHeaderTemplate(context, createNewUrl, windowName, callbackLoadData, width = 700, height = 600, addfiled = true, windowAction = () => null) {
    if (addfiled)
        addfiled = (
            <Button
                icon="pi pi-plus"
                onClick={e => {
                    e.preventDefault();
                    let w = g_openWindowDialog(createNewUrl, windowName, width, height, 'off', '', callbackLoadData);
                    if (windowAction) windowAction(w);
                }}
                style={{ float: 'right', marginLeft: '3px' }}
            />
        );
    else addfiled = <span />;
    return (
        <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>
            {addfiled}
            <Button
                icon="pi pi-search"
                onClick={e => {
                    e.preventDefault();
                    g_toggleSearch();
                }}
                style={{ float: 'right', marginLeft: '3px' }}
            />
            <Button
                icon="pi pi-refresh"
                onClick={e => {
                    e.preventDefault();
                    g_clear(context, callbackLoadData);
                }}
                style={{ float: 'right', marginLeft: '3px' }}
            />
        </div>
    );
}

export function g_getHeaderTemplatecF(context, functionN, callbackLoadData, addfiled = true, icon = 'pi pi-plus', tooltip = null) {
    if (addfiled) {
        if (Array.isArray(functionN)) {
            addfiled = functionN.map((a, i) => (
                <Button icon={Array.isArray(icon) ? icon[i] : icon} tooltip={tooltip[i] ?? ''} onClick={e => a(e)} style={{ float: 'right', marginLeft: '3px' }} />
            ));
        } else {
            addfiled = <Button icon={icon} onClick={e => functionN(e)} tooltip={tooltip ?? ''} style={{ float: 'right', marginLeft: '3px' }} />;
        }
    } else addfiled = <span />;
    return (
        <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>
            {addfiled}
            <Button
                icon="pi pi-search"
                onClick={e => {
                    e.preventDefault();
                    g_toggleSearch();
                }}
                style={{ float: 'right', marginLeft: '3px' }}
            />
            <Button
                icon="pi pi-refresh"
                onClick={e => {
                    e.preventDefault();
                    g_clear(context, callbackLoadData);
                }}
                style={{ float: 'right', marginLeft: '3px' }}
            />
        </div>
    );
}

export function g_getHeaderTemplateNull(context, callbackLoadData, addon = null) {
    return (
        <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>
            {addon}
            <Button
                icon="pi pi-search"
                onClick={e => {
                    e.preventDefault();
                    g_toggleSearch();
                }}
                style={{ float: 'right', marginLeft: '3px' }}
            />
            <Button
                icon="pi pi-refresh"
                onClick={e => {
                    e.preventDefault();
                    g_clear(context, callbackLoadData);
                }}
                style={{ float: 'right', marginLeft: '3px' }}
            />
        </div>
    );
}

export class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...g_genericRequired(props.rg ?? [g_pair('dateCreation', 'desc')]), ...(props.stateE ?? {}) };
    }
    componentDidMount() {
        g_hideSearch();
        if (typeof this.props.setup === 'function') this.props.setup(this);
        this.props.getData(this);
    }
    componentDidUpdate() {
        if (typeof this.props.update === 'function') this.props.update(this);
    }
    tooltipFs = raw => this.state['tt' + raw.idUUID];
    tooltipOver = raw => {
        let toSet = {};
        toSet['tt' + raw.idUUID] = true;
        this.setState(toSet);
    };
    tooltipLeave = raw => {
        let toSet = {};
        toSet['tt' + raw.idUUID] = false;
        this.setState(toSet);
    };
    getData = () => this.props?.getData(this);
    render() {
        return g_checkLoginACL(
            e =>
                !(this.props.hidden ?? (() => false))(this) ? (
                    <div className="card">
                        <Messages ref={e => (this.messages = e)} />
                        {(() => (this.props.title ? <h1>{typeof this.props.title === 'function' ? this.props.title(this) : this.props.title}</h1> : null))()}
                        {this.props.addon ? this.props.addon(this, e) : null}
                        {g_template_dataTable(
                            this,
                            this.props.header ? this.props.header(this, e) : null,
                            this.props.table(this, e, this.tooltipFs, this.tooltipOver, this.tooltipLeave),
                            this.getData
                        )}
                    </div>
                ) : null,
            this.props.checkAcl ?? true,
            this.props.fakename
        );
    }
}

/**
 * @function g_template_selector_data returns a <DataTable>
 */
export function g_template_selector_data(context, e, functioncallback = () => {}) {
    let { body = () => [], first = context.state.first, recordsTotal = context.state.recordsTotal, pageSize = context.state.pageSize, data = context.state.data } = e;
    if (!e.body) body = e;
    if (data === null) data = [];
    if ((context.state.pageNumber ?? 1) !== 1 && data.length === 0) context.setState({ pageNumber: 1 }, functioncallback);
    return (
        <>
            <div className="p-grid"> {data.map(body)} </div>
            <Paginator first={first} rows={pageSize} totalRecords={recordsTotal} onPageChange={e => g_page(e, context, functioncallback)}></Paginator>
        </>
    );
}

/**
 * @function g_template_selector_data_hook returns a <DataTable>
 */
export function g_template_selector_data_hook([indata, setData], e, functioncallback = () => {}, extra = 'p-grid') {
    let { body = () => [], first = indata.first, recordsTotal = indata.recordsTotal, pageSize = indata.pageSize, data = indata.data ?? [] } = e;
    if (!e.body) body = e;
    if ((indata.pageNumber ?? 1) !== 1 && data.length === 0) setData({ ...indata, pageNumber: 1 }, functioncallback);
    return (
        <>
            <div className={extra}> {data.map(body)} </div>
            <Paginator first={first} totalRecords={recordsTotal} rows={pageSize} onPageChange={e => g_page_hook(e, [indata, setData], functioncallback)}></Paginator>
        </>
    );
}
