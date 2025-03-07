export const config = {
    primaryColors: {
        dunkelblau: '#003869',
        mittelblau: '#5aa6e7',
        gelb: '#fbd200',
        grau: '#f5f5f5',
    },
    gleitzeitKontoColors: {
        blue: '#00aab4',
        grey: '#222222',
    },
    maxPageloadingLoops: 120, // 1s * 120 = 2 minutes
    pageloadingTimeout: 1000, // 1 s
    monthsToCalculateManually: 3,
    timesheetEndDate: new Date(2999, 11, 31), // month is 0-indexed
};

export const constStrings = {
    floatingDisplayID: 'gleitzeitkonto-canvas-headline',
    insertedDisplayID: 'gleitzeitkonto-display',
    cssID: 'gleitzeitkonto-css',
    buttonID: 'gleitzeitkonto-reload-button',
    refreshIconID: 'refresh-icon',
    prefixOvertime: 'Gleitzeitkonto: ',
    prefixError: 'Fehler: ',
    overtimeLoading: 'Loading...',
    // prettier-ignore
    errorMsgs: {
        pageloadingtimeExceeded: 'Die Seite hat zu lange geladen. Das Gleitzeitkonto kann nicht angezeigt werden.',
        unknown: 'Unbekannter Fehler.',
        noData: 'Keine Daten erhalten.',
        unableToContactAPI: 'Nicht mehr eingeloggt. Bitte Seite neu laden!',
        unexpectedBackgroundResponse: 'Datenverarbeitung fehlgeschlagen.',
        pageNotSupported: 'Diese Seite wird nicht unterstützt.',
    },
    cssClasses: {
        lightMode: 'gleitzeitkonto-light',
        darkMode: 'gleitzeitkonto-dark',
        displayLine: 'gleitzeit-display-line',
        insertedDisplay: 'inserted-display',
        floatingDisplay: 'floating-display',
        button: 'reset-button reload-button',
        loading: 'loading',
    },
};

/** Strings defined by external third parties, e.g. Fiori */
export const givenStrings = {
    gleitzeitHash: '#btccatstime-create',
    mainPageElement1: 'shellLayout',
    mainPageElement2: 'canvas',
    headerID: 'shell-header',
    headerEndID: 'shell-header-hdr-end',
    timeSheetURLPath: '/sap/opu/odata/sap/HCM_TIMESHEET_MAN_SRV/$batch?sap-client=300',
    employeeNumberURLPath: '/sap/opu/odata/sap/HCMFAB_COMMON_SRV/$batch',
    timeStatementURLPathFormat:
        "/sap/opu/odata/sap/HCMFAB_MYFORMS_SRV/FormDisplaySet(EmployeeNumber='{employeeNumber}',FormType='SAP_INT_TIM_STM',ParametersValues='BEGDA%3D{startDate}%40%3BENDDA%3D{endDate}')/$value",
    /** This part of the url indicates if the website is supported */
    externalURLSupported: '-sapdelim-fesruntime',
};
