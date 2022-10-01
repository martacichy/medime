export interface NotificationData {
    notId: number,
    userId: number,
    medicineName: string,
    medicineFrequency: number,
    illnessId?: number,
    ifMedicine: boolean,
    notDesc: string
}