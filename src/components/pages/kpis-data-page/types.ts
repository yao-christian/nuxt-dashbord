import { KpiData } from "~/types/kpi-data.type";

export interface Column {
    key: 'kpi' | 'operator' | 'date' | 'value' | 'new-value' | 'actions'
}

export interface RefreshKpisDataParam {
    kpiId: number;
    kpiFamilyId: number;
    operatorId: number;
}

export interface TableBody {
    column: Column;
    record: KpiData;
}

export interface FormState {
    operatorId?: number;
    kpiId?: number;
    kpiFamilyId?: number;
    kpiDataValue?: number
    dataType: number
}
