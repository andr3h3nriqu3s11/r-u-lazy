import React from 'react';
import { Messages } from 'primereact/messages';
import { g_checkLoginACL, g_genericRequired, g_hideSearch, g_template_dataTable } from '../GenericFunctions';
export default class ListPage extends React.Component {
    constructor(props) { super(props); this.state = {...g_genericRequired()}; }
    componentDidMount() { g_hideSearch(); if (typeof this.props.setup === "function") this.props.setup(this); this.props.getData(this) }
    componentDidUpdate() { if (typeof this.props.update === "function") this.props.update(this); }
    tooltipFs = raw => this.state['tt'+raw.idUUID]
    tooltipOver = raw => {let toSet = {}; toSet['tt' + raw.idUUID] = true; this.setState(toSet);}
    tooltipLeave = raw => {let toSet = {}; toSet['tt' + raw.idUUID] = false; this.setState(toSet);}
    getData = () => this.props?.getData(this);
    render() { return g_checkLoginACL(e => (
        <div className="card" >
          <Messages ref={e => this.messages = e} />
          {(() => this.props.title ? <h1>{typeof this.props.title === "function" ? this.props.title(this) : this.props.title}</h1> : null)()}
          {this.props.addon ? this.props.addon(this, e) : null}
          {g_template_dataTable(this, this.props.header(this, e), this.props.table(this, e, this.tooltipFs, this.tooltipOver, this.tooltipLeave), this.getData)}
        </div>));}
}
