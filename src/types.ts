import React, { ReactElement } from 'react';
export type {
    TablePageProps,
    TablePagePropsGetData,
    TablePagePropsGetTable,
    TablePagePropsHeader,
} from './DataTableNew';

export type LabelSelector = (
    name: string,
    prefix?: string,
    defaultValue?: string
) => string;

export interface QueryParam<T = any, K = string> {
    key: K;
    value: T;
}

export interface GenericQuery {
    filters?: QueryParam<string | number>[];
    orderBy?: QueryParam<string>[];
    pageNumber?: number;
    pageSize?: number;
}

export interface BasicListResponseData {
    pageSize: number;
    pageTotal: number;
    recordsTotal: number;
}

export interface GenericResponse {
    code: number;
    description: string;
    messages: QueryParam<number, string>[];
}

export interface GenericListResponse
    extends BasicListResponseData,
        GenericResponse {
    pageNumber: number;
}

export type StateItem = {
    class: string;
    color?: string;
    icon?: string;
    tooltip?: string;
    text?: string;
};
export type StateItems = { [key: number]: StateItem };

//TODO: change style
export interface DataTableArgument {
    t: string;
    data?: string;
    space?: string;
    style?: any;
    title?: string;
    onlyFilter?: boolean;
    c?: boolean;
    filter?: boolean;
    dataTrimLimit?: number;
    dataMap?: (a: any, row: any) => React.Component;
}
export type DataTableArgumentElementGeneric = DataTableArgument & {
    data: string;
    sortable?: boolean;
    align?: string;
    html?: boolean;
};
export type DataTableArgumentElementState = DataTableArgumentElementGeneric & {
    t: 'state';
    stateSize?: string;
    states: (row?: any) => StateItems | StateItems;
};
export type DataTableArgumentElementDate = DataTableArgumentElementGeneric & {
    t: 'date';
    extended?: boolean;
    di?: (a: any) => any;
};
export type DataTableArgumentElementDi<T> = DataTableArgumentElementGeneric & {
    t: 'di';
    di: (a: T) => any;
};
export type DataTableArgumentElementButton<T> = DataTableArgument & {
    t: 'button' | 'btt';
    data?: '';
    icon?: string;
    show?: (row: T) => boolean;
    click: (row: T, ev: any) => void;
    extra?: string;
    class?: string;
    tooltip?: string;
    label?: string;
};
export type DataTableArgumentElementMap = DataTableArgumentElementGeneric & {
    t: 'map';
    objs: { [key: string]: any };
};
export type DataTableArgumentElementDialog = DataTableArgument & {
    t: 'dil';
    id: (a: any) => string;
    text: string;
    onConfirm: (raw: any, ev: any) => void;
    label?: string;
    show?: (raw: any) => boolean;
    disabled?: boolean;
    classBttConfirm?: string;
    classBttDeny?: string;
    iconBttConfirm?: string;
    iconBttDeny?: string;
    class?: string;
    buttonClassName?: string;
    confirmText?: string;
    denyText?: string;
    icon?: string;
};
export type DataTableArgumentElementURL<T> = DataTableArgument & {
    t: 'url';
    icon?: string;
    url: (row: T) => string;
    width?: number;
    height?: number;
    callback?: () => void;
    class?: string;
    tooltip?: string;
};
export type DataTableArgumentElement<T> =
    | (DataTableArgument & { t: 'spacer' })
    | (DataTableArgumentElementGeneric & { t: 'd' })
    | DataTableArgumentElementDi<T>
    | DataTableArgumentElementDate
    | DataTableArgumentElementState
    //TODO: change click event
    | DataTableArgumentElementButton<T>
    | DataTableArgumentElementMap
    //TODO: change onConfirm
    | DataTableArgumentElementDialog
    | DataTableArgumentElementURL<T>;

export type DataTableArgumentElementComplex<T> = {
    body: DataTableArgumentElement<T>[];
    first: any;
    pageSize: number;
    recordsTotal: any;
    pageTotal: any;
    filterD: any;
    multiSortMeta: any;
    data: any;
};

export type GenericRequeridModel<T> = {
    filter: QueryParam<string>[];
    filterD: any;
    orderBy: QueryParam<string>[];
    dOrderBy: QueryParam<string>[];
    pageNumber: number;
    multiSortMeta: any[];
    first: number;
    pageSize: number;
    pageTotal: number;
    recordsTotal: number;
    data: T[];
};

export type DataTableArgumentAdvacend = {
    enabled?: boolean;
    id?: string;
    //TODO: Change event type
    addfiled?: (e: any) => void;
    filterbtt?: boolean;
    dTypes?: string[];
    filter?: string[];
    cc?: string[];
    l?: string[];
    options?: { [key: number]: StateItem & { label: string; value: string } }[];
    //TODO inprove
    ranges?: any[][];
    //TODO inprove
    handleChange?: any[];
    //TODO inprove
    class?: any;
    addon?: ReactElement;
    noPaging?: boolean;
};

export interface LoggedUserData {
    token: string;
    userName: string;
    name: string;
    LastLoginDate: string;
    responseCode: string;
    profileACLs: aclItem[];
    uuid: string;
    photo: string;
    associatedEntities: string;
    providers: string;
    consignators: string;
    financiers: string;
    consignatorList: string[];
    providerList: string[];
    financierList: string[];
    associatedEntityList: string[];
}

export interface CIDModel {
    description: string;
    descriptionShort: string;
    id: string;
    idUUID: string;
    type: number;
}

export interface CIDContractModel {
    cidId: string;
    cidIdUUID: string;
    contractIdUUID: string;
    dateCreation: string;
    dateUpdate: string;
    description: string;
    idUUID: string;
    status: number;
    type: number;
}

export interface ContractGet {
    code: number;
    description: string;
    url: string;
    contract: ContractModel;
}
export interface ContractComplementaryFieldsModel {
    contractTemplateFieldIdUUID: string;
    contractTemplateFieldType: number;
    fieldName: string;
    fieldValue: string;
    title: string;
}
export interface ContractInstalmentsModel {
    capital: number;
    contractIDUUID: string;
    dateCreation: string;
    dateInstallment: string;
    datePayed: string;
    dateUpdate: string;
    idUUID: string;
    installmentNumber: number;
    installmentStatus: number;
    installmentValue: number;
    interests: number;
}
export interface ContractRattingModel {
    dateCreation: string;
    dateUpdate: string;
    rate: number;
    rattingCategoryDescription: string;
    rattingCategoryIdUUID: string;
}

export interface ContractModel {
    allowToredeal: number;
    callbackUrl: string;
    consignatorIdUUID: string;
    consignatorName: string;
    consignatorPhoto: string;
    consigneeFullname: string;
    consigneeIdUUID: string;
    consigneePhoto: string;
    consigneeVatNumber: string;
    contractComplementaryFields: ContractComplementaryFieldsModel[];
    contractExternalReferenceId: string;
    contractInterestsPercentage: number;
    contractSignatureMode: number;
    contractStatus: number;
    contractStatusDescription: string;
    contractStatusMessage: string;
    contractTemplateBase: string;
    contractTemplateIdUUID: string;
    contractTemplateTitle: string;
    contractTemplateType: number;
    contractTemplateTypeDescription: string;
    contractTotalCapitalValue: number;
    contractTotalInterestsValue: number;
    contractTotalValue: number;
    contractType: number;
    dateContractEnd: string;
    dateContractStart: string;
    dateCreation: string;
    dateUpdate: string;
    documentDigitalized: string;
    fillerField1: string;
    idUUID: string;
    info: string;
    installmentTotal: number;
    installments: ContractInstalmentsModel[];
    obs: string;
    parentContractIdUUID: string;
    productIdUUID: string;
    productInterfaceName: string;
    productName: string;
    productPriceValue: number;
    providerIdUUID: string;
    providerName: string;
    providerPhoto: string;
    rateObservation: string;
    ratting: number;
    rattings: ContractRattingModel[];
    schedulingIdUUID: string;
    subscriptionCycleIdUUID: string;
    workflowType: number;
    workingEntityIdUUID: string;
    workingEntityName: string;
    workingEntityPhoto: string;
}

export interface ContractModelCreate {
    allowToredeal?: number;
    callbackUrl?: string;
    consignatorIdUUID: string;
    consigneeIdUUID: string;
    contractComplementaryFields?: ContractComplementaryFieldsModel[];
    contractExternalReferenceId?: string;
    contractInterestsPercentage?: number;
    contractSignatureMode?: number;
    contractStatus?: number;
    contractTemplateIdUUID: string;
    contractTotalCapitalValue?: number;
    contractTotalInterestsValue?: number;
    contractTotalValue?: number;
    contractType?: number;
    dateContractEnd?: string;
    dateContractStart?: string;
    documentDigitalized?: string;
    fillerField1?: string;
    idUUID?: string;
    info?: string;
    installmentTotal?: number;
    installments?: ContractInstalmentsModel[];
    obs?: string;
    parentContractIdUUID?: string;
    productIdUUID?: string;
    providerIdUUID?: string;
    rateObservation?: string;
    ratting?: number;
    rattings?: ContractRattingModel[];
    schedulingIdUUID?: string;
    subscriptionCycleIdUUID?: string;
    workflowType?: number;
    workingEntityIdUUID?: string;
}

export interface ConsigneeGet {
    code: number;
    consignee: ConsigneeModel;
    description: string;
}

export interface AddressModel extends AddressCreateModel {
    addressTypeDescription: string;
}
export interface AddressCreateModel {
    addressType: number;
    city: string;
    complement: string;
    country: number;
    idUUID: string;
    latitude: number;
    longitude: number;
    port: string;
    referenceIdUUID: string;
    state: string;
    street: string;
    streetZone: string;
    zipCode: number;
}
export interface ConsigneeBackAccounts {
    accountDigit: string;
    accountNumber: string;
    bankCode: number;
    branchDigit: string;
    branchNumber: string;
}
export interface ConsigneeParameters {
    logContextType: number;
    name: string;
    parameterValue: string;
    referenceIdUUID: string;
}
export interface ConsigneeModel {
    address: AddressModel[];
    appVersion: string;
    bankAccounts: ConsigneeBackAccounts[];
    civilStatus: number;
    consignatorFantasyName: string;
    consignatorIdUUID: string;
    consigneeStatus: number;
    consigneeType: number;
    dateBirth: string;
    dateCreation: string;
    dateUpdate: string;
    dependentNumber: number;
    deviceBrand: string;
    deviceId: string;
    deviceModel: string;
    deviceType: string;
    email: string;
    employeeGovId: string;
    employeeId: string;
    entityType: number;
    erpCode: string;
    fatherName: string;
    fullname: string;
    gender: number;
    hablitation: number;
    idUUID: string;
    loyaltyPointsBalance: number;
    motherName: string;
    phoneCommercial: string;
    phoneHome: string;
    phoneMobile: string;
    photo: string;
    photoConsignator: string;
    rate: number;
    registerId: string;
    totalMargin: number;
    usedMargin: number;
    userIdUUID: string;
    username: string;
    vatNumber: string;
}
export interface ContractTemplateFormsFieldsModel {
    contractFormMode: number;
    contractFormModeValue: string;
    contractTemplateFieldStatus: number;
    contractTemplateFormIdUUID: string;
    dateCreation: string;
    dateUpdate: string;
    fieldHeight: string;
    fieldListValues: string;
    fieldMaxSize: number;
    fieldName: string;
    fieldPosition: number;
    fieldType: number;
    fieldValue: string;
    fieldWidth: string;
    help: string;
    idUUID: string;
    mandatory: number;
    title: string;
}
export interface ContractTemplateFormsModel {
    contractFields: ContractTemplateFormsFieldsModel[];
    contractFormMode: number;
    contractFormModeValue: string;
    contractTemplateFormStatus: number;
    contractTemplateFormType: number;
    contractTemplateIdUUID: string;
    dateCreation: string;
    dateUpdate: string;
    help: string;
    idUUID: string;
    page: number;
    title: string;
}

export interface UserAssociatedEntitiesModel {
    dateCreation: string;
    dateUpdate: string;
    entityIdUUID: string;
    entityName: string;
    entityUserStatus: number;
    entityUserType: number;
    idUUID: string;
    userIdUUID: string;
    username: string;
}

export interface UserACLModel {
    c: number;
    d: number;
    r: number;
    tag: string;
    type: number;
    u: number;
}

export interface MFile extends File {
    arrayByte?: string | ArrayBuffer | null;
}

export interface UserModel {
    appVersion: string;
    applicationId: string;
    associatedEntities: UserAssociatedEntitiesModel[];
    dateCreation: string;
    dateLastLogin: string;
    dateLastPasswordChange: string;
    dateLastUserLock: string;
    dateLegalAcceptance: string;
    dateMobileEnrollment: string;
    dateUpdate: string;
    deviceBrand: string;
    deviceId: string;
    deviceModel: string;
    deviceType: string;
    email: string;
    fullname: string;
    idUUID: string;
    languageId: string;
    legalAcceptanceStatus: number;
    mobileEnrollmentStatus: number;
    passwordRetries: number;
    phoneMobile: string;
    photo: string;
    profileACLs: UserACLModel[];
    userStatus: number;
    userType: UserType;
    username: string;
}

export enum UserType {
    APP = 0,
    BO = 1,
    WS = 2,
}
export interface ProviderModel {
    address: AddressModel[];
    addressMode: number;
    chatMode: number;
    dateCreation: string;
    dateUpdate: string;
    email: string;
    emailMode: number;
    entityId: number;
    entityType: number;
    erpCode: string;
    fantasyName: string;
    id: number;
    idUUID: string;
    longDescription: string;
    name: string;
    organizationIdUUID: string;
    organizationName: string;
    parentIdUUID: string;
    parentName: string;
    phoneHome: string;
    phoneMobile: string;
    phoneMode: number;
    photo: string;
    providerStatus: number;
    providerType: number;
    rate: number;
    schedulingMode: number;
    searchAreaCategory: number;
    shortDescription: string;
    vatNumber: string;
}

export interface CampaignItemModel {
    afterCancelationValue: number;
    afterCondicionalValue: number;
    beforeCondicionalValue: number;
    campaignIdUUID: string;
    campaignItemMode: number;
    condicionalValue: number;
    idUUID: string;
    productIdUUID: string;
    searchAreaServiceType: number;
    productName: string;
    searchAreaServiceTypeDescription: string;

    dateCreation?: string;
    dateUpdate?: string;
}

export interface CampaignItemCreateModel {
    afterCancelationValue: number | string;
    afterCondicionalValue: number | string;
    beforeCondicionalValue: number | string;
    campaignIdUUID: string;
    campaignItemMode: number | string;
    condicionalValue: number | string;
    idUUID?: string;
    productIdUUID: string;
    searchAreaServiceType: number | string;
}

export interface CampaignItemListModelImages {
    contextId: number;
    creationUserIdUUID: string;
    dateCreation: string;
    dateUpdate: string;
    description: string;
    documentStatus: number;
    documentType: number;
    documentTypeDescription: string;
    filename: string;
    filenameOriginal: string;
    idUUID: string;
    orderView: number;
    referenceIdUUID: string;
}

export interface CampaignItemListModel {
    afterCondicionalValue: number;
    beforeCondicionalValue: number;
    afterCancelationValue: number;
    billingToMode: number;
    campaignItemIdUUID: string;
    campaignItemMode: number;
    condicionalValue: number;
    contractActionText: string;
    contractTemplateIdUUID: string;
    contractTemplateType: number;
    images: CampaignItemListModelImages[];
    iofadditional: number;
    iofannual: number;
    lenderTax: number;
    longDescription: string;
    marginControl: number;
    maxPeriod: number;
    maxValue: number;
    minPeriod: number;
    minValue: number;
    monthlyTax: number;
    name: string;
    period: number;
    photoBig: string;
    photoSmall: string;
    price: number;
    priceContextTitle: string;
    productIdUUID: string;
    productMode: number;
    productType: number;
    productTypeDescription: string;
    providerIdUUID: string;
    providerName: string;
    scriptInstallmentSimulation: string;
    searchAreaServiceType: number;
    searchAreaServiceTypeDescription: string;
    shortDescription: string;
    stepPeriod: number;
    stepValue: number;
    workflowTypeId: number;
}
