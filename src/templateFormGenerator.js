import React from 'react';
import { g_template_form } from '../GenericFunctions';

export class TemplateFromGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: {} };
    }
    render() {
        if (!this.props.template()?.contractForms) return null;
        let dTypeFs = {};
        let options = {};
        let style = {};
        let r = [];
        let maped = {};
        this.props.template().contractForms.forEach(a => (maped[Number(a.page)] = a.contractFields));
        let keys = Object.keys(maped);
        keys.sort((a, b) => a - b);
        keys.forEach(e => {
            let maped1 = {};
            maped[e].forEach(a => (maped1[Number(a.fieldPosition)] = a));
            let keys1 = Object.keys(maped1);
            keys1.sort((a, b) => a - b);
            keys1.forEach(e => r.push(maped1[e]));
        });
        r.forEach((e, i) => {
            switch (e.fieldType) {
                case 2:
                    dTypeFs[i] = 'numeric';
                    break;
                case 4:
                    dTypeFs[i] = 'check';
                    break;
                case 5:
                case 6:
                case 7:
                    dTypeFs[i] = 'drop';
                    options[i] = e.fieldListValues.split('|').map(a => ({ label: a.split(':')[1], value: a.split(':')[0] }));
                    break;
                case 17:
                    dTypeFs[i] = 'area';
                    style[i] = { minHeight: e.fieldHeight ?? '10em' };
                    break;
                case 16:
                    dTypeFs[i] = 'editor';
                    style[i] = { minHeight: e.fieldHeight ?? '5em' };
                    break;
                default:
                    break;
            }
        });
        return (
            <div className={'p-card' + this.props.className ? this.props.className : ''} style={this.props.style}>
                {g_template_form(
                    this,
                    () => [
                        {
                            t: 'array',
                            dTypeF: 't',
                            dTypeFs: dTypeFs,
                            options: options,
                            l: r.map(e => e.title),
                            cc: r.map(e => e.fieldWidth ?? 'l'),
                            filter: r.map(e => e.fieldName),
                            style: style,
                        },
                    ],
                    () => [],
                    () => [[]],
                    () => {},
                    this.props.dfLabelSize ?? 2,
                    false,
                    this.props.mode,
                    'p-col-12',
                    -1,
                    this.props.height ? this.props.height : '100%'
                )}
            </div>
        );
    }
}

export class TemplateFromGeneratorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.vValue ?? {} };
    }
    componentWillUnmount() {
        if (this.props.save) this.props.save(this);
    }
    render() {
        if (!this.props.template()) return null;
        let dTypeFs = {},
            options = {},
            style = {},
            r = [],
            maped1 = {},
            dElm = {};
        this.props.template().forEach(a => (maped1[Number(a.fieldPosition)] = a));
        let keys1 = Object.keys(maped1);
        keys1.sort((a, b) => a - b);
        keys1.forEach(e => r.push(maped1[e]));
        r.forEach((e, i) => {
            let id = e.fieldName;
            switch (e.fieldType) {
                case 2:
                    dTypeFs[i] = 'numeric';
                    if ((this.state.data[id] ?? false) === false) {
                        let toSet = { data: { ...this.state.data } };
                        toSet.data[id] = '';
                        this.setState(toSet);
                    }
                    break;
                case 4:
                    dTypeFs[i] = 'check';
                    break;
                case 17:
                    dTypeFs[i] = 'area';
                    style[i] = { minHeight: e.fieldHeight ?? '10em' };
                    break;
                case 5:
                case 6:
                case 7:
                    dTypeFs[i] = 'drop';
                    options[i] = e.fieldListValues.split('|').map(a => ({ label: a.split(':')[1], value: a.split(':')[0] }));
                    break;
                case 16:
                    dTypeFs[i] = 'editor';
                    style[i] = { minHeight: e.fieldHeight ?? '5em' };
                    break;
                default:
                    break;
            }
        });
        return (
            <div className={'p-card' + this.props.className ? this.props.className : ''} style={this.props.style}>
                {g_template_form(
                    this,
                    () => [
                        { t: 'array', dTypeF: 't', dElm, dTypeFs, options, l: r.map(e => e.title), cc: r.map(e => e.fieldWidth ?? 'l'), filter: r.map(e => e.fieldName), style },
                    ],
                    () => [],
                    () => [[]],
                    () => {},
                    2,
                    false,
                    this.props.mode,
                    'p-col-12',
                    -1,
                    this.props.height ?? '100%'
                )}
            </div>
        );
    }
}
