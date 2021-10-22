import React from 'react';
import { Messages } from 'primereact/messages';
import { g_genericRequired, g_getHeaderTemplatecF, g_hideSearch, g_template_dataTable } from '../GenericFunctions';

export default class GSelectorData extends React.Component {
    constructor(props) {
        super(props);
        this.state = g_genericRequired();
    }
    componentDidMount() {
        g_hideSearch();
        this.props.context().props.getData(this.props.context());
    }
    render() {
        let extrafunction = this.props.context().props.extrafunction;
        return (
            <div>
                <Messages ref={e => (this.props.context().messages = e)} />
                {g_template_dataTable(
                    this.props.context(),
                    g_getHeaderTemplatecF(
                        this,
                        extrafunction,
                        () => this.props.context().props.getData(this.props.context()),
                        extrafunction !== null && extrafunction !== undefined,
                        this.props.context().props.extrafunctionicon
                    ),
                    typeof this.props.context().props.tableBody === 'function' ? this.props.context().props.tableBody(this.props.context()) : this.props.context().props.tableBody,
                    () =>
                        this.props
                            .context()
                            .props.getData(
                                this.props.context(),
                                this.props.context().state.tToF,
                                this.props.context().state.dates,
                                this.props.context().state.tToA,
                                this.props.context().state.tToR,
                                {
                                    first: this.props.context().state.first,
                                    pageSize: this.props.context().state.pageSize,
                                    recordsTotal: this.props.context().state.recordsTotal,
                                    pageTotal: this.props.context().state.pageTotal,
                                    multiSortMeta: this.props.context().state.multiSortMeta,
                                    data: this.props.context().state.data,
                                }
                            )
                )}
            </div>
        );
    }
}
