import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { Component } from 'react';
import { g_genericRequired, g_hideSearch } from '../GenericFunctions';
import GSelectorData from './GSelectorData';

//TODO: make generic
export default class GSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...g_genericRequired(),
            getData: () => {},
            returnF: () => {},
            label: '',
            selected: '',
            selectedHidden: '',
            tableBody: [],
            tToF: {},
            tToA: {},
            tToR: {},
            dates: [],
            labelwraper: 'p-col-3',
            inputtextwarper: 'p-col-2',
            buttonwarper: 'p-col-1',
            req: true,
            disabled: false,
            visible: false,
            hidden: false,
        };
    }

    componentDidMount() {
        let toSet = {};
        if (this.props.label) toSet = {...toSet, label: this.props.label}
        if (this.props.returnF) toSet = {...toSet, returnF: this.props.returnF}
        if (this.props.labelwraper) toSet = {...toSet, labelwraper: this.props.labelwraper}
        if (this.props.inputtextwarper) toSet = {...toSet, inputtextwarper: this.props.inputtextwarper}
        if (this.props.buttonwarper) toSet = {...toSet, buttonwarper: this.props.buttonwarper}
        if (this.props.tableBody) toSet = {...toSet, tableBody: this.props.tableBody}
        if (this.props.tToF) toSet = {...toSet, tToF: this.props.tToF}
        if (this.props.tToA) toSet = {...toSet, tToA: this.props.tToA}
        if (this.props.tToR) toSet = {...toSet, tToR: this.props.tToR}
        if (this.props.dates) toSet = {...toSet, dates: this.props.dates}
        if (this.props.req) toSet = {...toSet, req: this.props.req}
        if (this.props.disabled) toSet = {...toSet, disabled: this.props.disabled}
        if (this.props.hidden) toSet = {...toSet, disabled: this.props.hidden}
        if (this.props.startV) toSet = {...toSet, selected: this.props.startV}
        g_hideSearch();
        this.setState(toSet);
    }

    toggleDialog =  async e => {
        if(e) e.preventDefault();
        console.log("teste");
        this.setState({visible: !this.state.visible});
    }
    
    render() {
        if (this.props.hidden) return null;
        return (
            <div className={this.props.divinitclassname}>
              <Dialog header='Selecionar' visible={this.state.visible} style={{width:"80vw", height:"80vh"}} onHide={() => this.setState({visible: false})} >
                <GSelectorData context={() => this} />
              </Dialog>               
              <div style={{'display': this.state.hidden ? 'none' : ''}} className='p-grid p-fluid'>
                <div className={this.props.labelwraper ===''? this.props.labelwraper:this.state.labelwraper} >{this.state.label}</div>
                <div className={this.state.inputtextwarper} ><InputText value={this.state.selected ===''?this.props.startV:this.state.selected} required={this.props.req} onChange={() => {}} onClick={this.toggleDialog} disabled={this.props.disabled} /></div>
                <div className={this.state.buttonwarper} ><Button label='' style={{width:'1.5em',top: '0.2em'}} width='1em' icon='pi pi-plus' onClick={e => this.toggleDialog(e)} disabled={this.props.disabled} />
                {(() => this.props.gobtt ? <Button label='' style={{width:'1.5em',top: '0.2em', marginLeft: '3px'}} width='1em' icon='pi pi-pencil' className="p-button-warning" onClick={e => { e.preventDefault(); this.props.jump()}} /> : null)()}</div>
              </div>
            </div>
        );
    }
}

export class GSelectorAdvanced extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ...g_genericRequired(),
            getData: () => {},
            returnF: () => {},
            label: '',
            selected: '',
            selectedHidden: '',
            tableBody: [],
            tToF: {},
            tToA: {},
            tToR: {},
            dates: [],
            labelwraper: 'p-col-3',
            inputtextwarper: 'p-col-2',
            buttonwarper: 'p-col-1',
            req: true,
            disabled: false,
            visible: false,
            hidden: false,
        };
    }

    componentDidMount() {
        let toSet = {};
        if (this.props.label) toSet = {...toSet, label: this.props.label}
        if (this.props.returnF) toSet = {...toSet, returnF: this.props.returnF}
        if (this.props.labelwraper) toSet = {...toSet, labelwraper: this.props.labelwraper}
        if (this.props.inputtextwarper) toSet = {...toSet, inputtextwarper: this.props.inputtextwarper}
        if (this.props.buttonwarper) toSet = {...toSet, buttonwarper: this.props.buttonwarper}
        if (this.props.tableBody) toSet = {...toSet, tableBody: this.props.tableBody}
        if (this.props.tToF) toSet = {...toSet, tToF: this.props.tToF}
        if (this.props.tToA) toSet = {...toSet, tToA: this.props.tToA}
        if (this.props.tToR) toSet = {...toSet, tToR: this.props.tToR}
        if (this.props.dates) toSet = {...toSet, dates: this.props.dates}
        if (this.props.req) toSet = {...toSet, req: this.props.req}
        if (this.props.disabled) toSet = {...toSet, disabled: this.props.disabled}
        if (this.props.hidden) toSet = {...toSet, disabled: this.props.hidden}
        if (this.props.startV) toSet = {...toSet, selected: this.props.startV}
        g_hideSearch();
        this.setState(toSet);
    }

    toggleDialog =  async e => {
        if(e) e.preventDefault();
        console.log("teste");
        this.setState({visible: !this.state.visible});
    }

    render() {
        if (this.props.hidden) return null;
        return (
            <div className={this.props.divinitclassname}>
              <Dialog header='Selecionar' visible={this.state.visible} style={{width:"80vw", height:"80vh"}} onHide={() => this.setState({visible: false})} >
                <GSelectorData context={() => this} />
              </Dialog>               
              <div style={{'display': this.state.hidden ? 'none' : ''}} className='p-grid p-fluid'>
                {this.props.addon(this)}
              </div>
            </div>
        );
    }
}
